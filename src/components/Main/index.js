import Header from "./Header";
import Dropzone from "./Dropzone";
import DropzoneContent from "./Dropzone/Content/index";
import LayersManager from "./LayersManager";
import SettingsManager from "./SettingsManager";
import Cropzone from "./Cropzone";
import Workspace from "./Workspace";
import { MainContext } from "context";
import * as actions from "ducks/main";
import * as uiActions from "ducks/ui";
import * as historyActions from "ducks/history";
import {
  hasLayers,
  getVisibleLayers,
  getWorkspaceSettings,
  getSelectedLayer,
  hasPrelayerToLayer,
  hasCrop
} from "selectors/main";
import {
  getHistoryStage,
  hasHistory,
  getStateFromHistory
} from "selectors/history";
import { getTextManager, hasActiveNavButton } from "selectors/ui";
import createLayer from "services/layer";
import layerResize from "services/layer/resize";
import layerCut from "services/layer/cut";
import toBlobUrl from "services/toBlobUrl";
import prelayerCrossStyle from "services/prelayerCrossStyle";
import getCenterPosition from "services/getCenterPosition";
import getFilterValue from "services/getFilterValue";
import getFilters from "services/getFilters";
import clearFields from "services/clearFields";

import Container from "UI/Container";
import Page from "UI/Page";
import { arrayMove } from "react-sortable-hoc";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.actions = bindActionCreators(actions, props.dispatch);
    this.uiActions = bindActionCreators(uiActions, props.dispatch);
    this.historyActions = bindActionCreators(historyActions, props.dispatch);

    this.links = {
      selectedLayerRef: React.createRef()
    };

    this.services = {
      getFilters
    };

    this.methods = {
      reset: this.reset.bind(this),
      onLayerSortEnd: this.onLayerSortEnd.bind(this),
      onLayerSortStart: this.onLayerSortStart.bind(this),
      onToggleLayer: this.onToggleLayer.bind(this),
      onRemoveLayer: this.onRemoveLayer.bind(this),
      onSelectLayer: this.onSelectLayer.bind(this),

      onUploadImage: this.onUploadImage.bind(this),
      onDropImage: this.onDropImage.bind(this),

      onClickNavigationButton: this.onClickNavigationButton.bind(this),

      onFilterLayer: this.onFilterLayer.bind(this),
      onCropLayer: this.onCropLayer.bind(this),
      onCutLayer: this.onCutLayer.bind(this),
      onCropLayerWithNewLayer: this.onCropLayerWithNewLayer.bind(this),
      onCutLayerWithNewLayer: this.onCutLayerWithNewLayer.bind(this),
      onUpdateLayerByFilter: this.onUpdateLayerByFilter.bind(this),
      onDragPrelayer: this.onDragPrelayer.bind(this),
      onResizePrelayer: this.onResizePrelayer.bind(this),
      onMovePrelayerToLayer: this.onMovePrelayerToLayer.bind(this),
      onUpdateLayer: this.onUpdateLayer.bind(this),
      onResizeWorkspace: this.onResizeWorkspace.bind(this),
      onResizeWorkspaceEnd: this.onResizeWorkspaceEnd.bind(this),
      onUpdatePrelayerText: this.onUpdatePrelayerText.bind(this),
      onChangeFontFamily: this.onChangeFontFamily.bind(this),
      onChangeFontSize: this.onChangeFontSize.bind(this),
      onChangeTextColor: this.onChangeTextColor.bind(this),
      onChangeTextStyling: this.onChangeTextStyling.bind(this),
      onChangeTextAligning: this.onChangeTextAligning.bind(this),
      onChangeTextDecorating: this.onChangeTextDecorating.bind(this)
    };

    this.providerValue = {
      ...this.links,
      ...this.actions,
      ...this.methods,
      ...this.services
    };

    this.onLayerDragStart = this.onLayerDragStart.bind(this);
    this.onLayerDrag = this.onLayerDrag.bind(this);
    this.onLayerDragEnd = this.onLayerDragEnd.bind(this);
  }

  isIgnoreDrag({ target }) {
    return !!(target.closest("header") || target.closest(".react-draggable"));
  }

  get stageMethod() {
    return this[
      {
        createTextLayer: "onMovePrelayerToLayer",
        transformLayer: "onUpdateLayer",
        filterLayer: "onUpdateLayerByFilter",
        cropLayer: "onCropLayer"
      }[this.props.stage]
    ];
  }

  async componentDidUpdate() {
    const { current: ref } = this.links.selectedLayerRef;
    const defaultValues = {
      nextCache: false,
      nextLayer: false,
      nextHistoryFill: false
    };

    const {
      isHistoryFill,
      hasHistory,
      selectedLayer = defaultValues
    } = this.props;

    const { nextCache, nextLayer, nextHistoryFill } = selectedLayer;

    if (!nextHistoryFill) {
      this.pushHistory(isHistoryFill, hasHistory);
    }

    // Recache layer
    if (nextCache) {
      ref.cache();

      this.actions.updateSelectedLayer({
        nextCache: false
      });
    }

    // Reinit layer
    if (nextLayer) {
      const { width, height, base64, img } = await this.createImage(ref);
      const normalizedSelectedLayer = clearFields(
        selectedLayer,
        this.layerClearFields
      );

      this.actions.changeSelectedLayer({
        ...normalizedSelectedLayer,
        width,
        height,
        ...this.getOffsets(width, height),
        native: img,
        url: base64,
        nextLayer: false,
        nextHistoryFill: false,
        id: Date.now()
      });

      if (nextHistoryFill) {
        this.pushHistory(true, hasHistory);
      }
    }
  }

  pushHistory(isHistoryFill, hasHistory) {
    if (isHistoryFill) {
      this.actions.toggleHistoryFill(false);
      this.historyActions.fillHistory({
        ...this.props.mainState,
        isHistoryFill: false
      });
    }

    if (hasHistory) {
      this.actions.updateAllState(this.props.stateFromHistory);
      this.historyActions.updateHistory({
        allow: false
      });
    }
  }

  // Layer methods
  get layerClearFields() {
    return [
      "scaleX",
      "rotation",
      "red",
      "green",
      "blue",
      "alpha",
      "saturation",
      "luminance",
      "crop",
      "lastX",
      "lastOffsetX",
      "lastY",
      "lastOffsetY"
    ];
  }

  createImage(ref, createSmallBase64) {
    return new Promise(resolve => {
      // Отображаем слой, так как в text он скрывается
      ref.visible(true).toImage({
        callback: img => {
          const { width, height } = img;
          const base64 = img.getAttribute("src");
          const smallBase64 =
            createSmallBase64 &&
            ref.toDataURL({
              width: 170,
              height: 40
            });

          resolve({
            img,
            width,
            height,
            base64: toBlobUrl(base64),
            smallBase64: toBlobUrl(smallBase64)
          });
        }
      });
    });
  }

  getOffsets(width, height) {
    return {
      offsetX: width / 2,
      offsetY: height / 2
    };
  }

  getAxisBySize({ x, y, width, height }) {
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  getIdByEvent(event, isTarget) {
    return +event[isTarget ? "target" : "currentTarget"].dataset.id;
  }

  onLayerSortStart(sortable, event) {
    const { type } = event.target.dataset;

    if (type === "select-layer-area") this.onSelectLayer(event);
  }

  onLayerSortEnd({ oldIndex, newIndex }) {
    const { layers } = this.props;
    const sortedLayers = arrayMove(layers, oldIndex, newIndex);

    this.actions.sortLayers(sortedLayers);
  }

  onLayerDragStart(event) {
    if (this.isIgnoreDrag(event)) {
      return;
    }

    const { pageCursor } = this.props;

    if (pageCursor === "move") {
      const { pageX: startPageX, pageY: startPageY } = event;
      const { x, y } = this.props.selectedLayer;

      this.actions.updateSelectedLayer({
        startPageX,
        startPageY,
        startX: x,
        startY: y
      });

      window.addEventListener("mousemove", this.onLayerDrag);
    } else if (pageCursor === "crosshair") {
      const { pageX, pageY } = event;

      this.actions.updateCrop({
        x: pageX,
        y: pageY,
        startX: pageX,
        startY: pageY,
        width: 0,
        height: 0,
        finished: false
      });

      window.addEventListener("mousemove", this.onLayerDrag);
    }
  }

  onLayerDrag({ pageX, pageY }) {
    const { pageCursor } = this.props;

    if (pageCursor === "move") {
      const {
        startPageX,
        startPageY,
        startX,
        startY
      } = this.props.selectedLayer;
      const newPageX = pageX - startPageX;
      const newPageY = pageY - startPageY;

      this.actions.updateSelectedLayer({
        x: startX + newPageX,
        y: startY + newPageY
      });
    } else if (pageCursor === "crosshair") {
      const { startX, startY } = this.props.crop;
      const diffX = pageX - startX;
      const diffY = pageY - startY;

      this.actions.updateCrop({
        width: Math.abs(diffX),
        height: Math.abs(diffY),
        x: diffX < 0 ? startX + diffX : startX,
        y: diffY < 0 ? startY + diffY : startY
      });
    }
  }

  onLayerDragEnd(event) {
    if (this.isIgnoreDrag(event)) {
      return;
    }

    const { pageCursor } = this.props;

    if (pageCursor) {
      const { selectedLayer } = this.props;

      if (selectedLayer) {
        const { x, y, offsetX, offsetY } = selectedLayer;

        this.actions.updateSelectedLayer({
          firstX: x - offsetX,
          firstY: y - offsetY
        });
      }

      window.removeEventListener("mousemove", this.onLayerDrag);
    }

    if (pageCursor === "crosshair") {
      const { width, height } = this.props.crop;

      if (width < 5 || height < 5) this.actions.setCrop(null);
      else {
        this.actions.updateCrop({
          finished: true
        });
      }
    }

    if (pageCursor !== "crosshair") {
      this.actions.toggleHistoryFill(true);
    }
  }

  onToggleLayer(event) {
    const id = this.getIdByEvent(event);
    this.actions.toggleLayer(id);
  }

  onRemoveLayer(event) {
    const isRemove = window.confirm(Translation.layerRemoveWarning);

    if (isRemove) {
      const { layers, prelayer, templayer } = this.props;
      const { length: layerLength } = layers;
      const id = this.getIdByEvent(event);

      this.actions.removeLayer(id);

      if (layerLength > 1) this.actions.toggleHistoryFill(true);

      if (layerLength === 1 || templayer || prelayer) {
        this.reset();
      }
    }
  }

  onSelectLayer(event) {
    const { prelayer, templayer, selectedLayer } = this.props;
    const id = this.getIdByEvent(event, true);

    if ((prelayer || templayer) && selectedLayer.id !== id) {
      this.reset();
    }

    this.actions.selectLayer(id);
  }

  async onMovePrelayerToLayer() {
    const { current: ref } = this.links.selectedLayerRef;
    const { width, height, x, y } = this.props.prelayer;
    const { img, base64, smallBase64 } = await this.createImage(ref, true);

    this.actions.updateLayers({
      selected: false
    });

    this.actions.updatePrelayer({
      type: "image",
      visible: true,
      url: base64,
      native: img,
      textImageUrl: smallBase64,
      ...this.getAxisBySize({ x, y, width, height }),
      ...this.getOffsets(width, height)
    });

    this.actions.movePrelayerToLayer();
    this.reset(false, true);
  }

  onResizeWorkspace(event, direction, ref, delta) {
    const newWidth = parseInt(ref.style.width, 10);
    const newHeight = parseInt(ref.style.height, 10);

    this.actions.setPreworkspaceSettings({
      width: newWidth,
      height: newHeight,
      ...getCenterPosition(newWidth, newHeight)
    });
  }

  onResizeWorkspaceEnd() {
    const { preworkspaceSettings } = this.props;

    this.actions.createWorkspaceSettings(preworkspaceSettings);
    this.reset(true, true);
  }

  async onUpdateLayer() {
    const { prelayer } = this.props;
    const { width, offsetX, offsetY, height, x, y, native } = prelayer;

    const { image, base64 } = await layerResize(
      {
        image: native,
        width,
        height
      },
      true
    );

    this.actions.changeSelectedLayer({
      ...prelayer,
      ...this.getOffsets(width, height),
      native: image,
      url: base64,
      // Тут еще вычитывается `[size]/2` так как
      // Размеры (ширина/высота) у блока меняются
      x: x - (offsetX - width / 2),
      y: y - (offsetY - height / 2),
      // Вычитывается чтобы при crop, обновить начальные позиции осей
      // Тут не учитываются размеры, так как тут позиции осей
      // Нужны без этих размеров
      firstX: x - offsetX,
      firstY: y - offsetY
    });

    this.reset(false, true);
  }

  onFilterLayer({ name: filter, value }) {
    const layer = this.props.selectedLayer;
    const filterValue = getFilterValue(filter, value);

    const isRGB = ~["red", "green", "blue"].indexOf(filter);
    const hasRGB = ["red", "green", "blue"].some(color => layer[color]);

    const layerWithNewFilter = clearFields(
      {
        ...layer,
        alpha: isRGB || hasRGB ? 0.6 : 0,
        [filter]: filterValue
      },
      [
        value ? "do-not-clear" : filter,
        hasRGB || (isRGB && value) ? "do-not-clear" : "alpha"
      ]
    );

    this.actions.changeSelectedLayer(layerWithNewFilter);
  }

  onCropLayer(withNewLayer) {
    // See `onClickNavigationButton` method
    if (!this.props.crop) return;

    const {
      crop: { x: cropX, y: cropY, width, height },
      selectedLayer: { x: layerX, y: layerY, offsetX, offsetY, firstX, firstY }
    } = this.props;

    const normalizedFirstX =
      typeof firstX === "number" ? firstX : layerX - offsetX;
    const normalizedFirstY =
      typeof firstY === "number" ? firstY : layerY - offsetY;

    const layerUpdates = {
      ...this.getOffsets(width, height),
      ...this.getAxisBySize({ x: cropX, y: cropY, width, height }),
      nextLayer: true,
      nextHistoryFill: true,
      firstX: normalizedFirstX,
      firstY: normalizedFirstY,
      crop: {
        x: cropX - normalizedFirstX,
        y: cropY - normalizedFirstY,
        width,
        height
      },
      width,
      height
    };

    if (withNewLayer === true) {
      this.actions.updateLayers({
        selected: false
      });

      this.actions.addLayer({
        ...this.props.selectedLayer,
        ...layerUpdates,
        id: Date.now(),
        selected: true,
        isVisible: true
      });
    } else {
      this.actions.updateSelectedLayer(layerUpdates);
    }

    this.actions.setCrop(null);
    this.reset();
  }

  onCropLayerWithNewLayer() {
    this.onCropLayer(true);
  }

  async onCutLayer(withNewLayer) {
    const { crop, selectedLayer } = this.props;

    const {
      width,
      height,
      offsetX,
      offsetY,
      native: image,
      x: layerX,
      y: layerY
    } = selectedLayer;

    const cut = {
      ...crop,
      x: crop.x - (layerX - offsetX),
      y: crop.y - (layerY - offsetY)
    };

    const cutted = await layerCut({ image, width, height, cut });

    if (withNewLayer === true) {
      this.actions.updateLayers({
        selected: false
      });

      this.actions.addLayer({
        ...selectedLayer,
        ...cutted,
        id: Date.now(),
        selected: true,
        visible: true,
        isVisible: true
      });
    } else {
      this.actions.updateSelectedLayer(cutted);
    }

    this.actions.setCrop(null);
    this.reset(false, true);
  }

  onCutLayerWithNewLayer() {
    this.onCutLayer(true);
  }

  onUpdateLayerByFilter() {
    this.reset(true);
    this.actions.updateSelectedLayer({
      nextLayer: true,
      nextHistoryFill: true
    });
  }

  // Layer creating methods
  async createImageLayer(image) {
    if (image) {
      const { hasLayers, imageHistory } = this.props;
      const hasLikeImage = imageHistory.indexOf(image.name) !== -1;

      if (hasLikeImage && !window.confirm(Translation.twiceTimeUploadWarning)) {
        return false;
      }

      const imageLayer = await createLayer("image", image);

      if (!hasLayers) {
        this.createWorkspaceSettings(imageLayer);
      }

      this.actions.updateLayers({
        selected: false
      });

      this.actions.addLayer(imageLayer);
      this.actions.fillImageHistory(image.name);
      this.actions.toggleHistoryFill(true);
    }

    return this;
  }

  onUploadImage(event) {
    const [image] = event.target.files;
    this.createImageLayer(image);

    // Clear last file
    event.target.value = null;
  }

  onDropImage([image]) {
    this.createImageLayer(image);
  }

  // Workspace methods
  createWorkspaceSettings({ width, height }) {
    const { x, y } = getCenterPosition(width, height);
    this.actions.createWorkspaceSettings({ width, height, x, y });
  }

  // Prelayer methods
  onDragPrelayer(event, data) {
    const { offsetX = 0, offsetY = 0 } = this.props.prelayer;
    const { x, y } = data;

    this.actions.updatePrelayer({
      x: x + offsetX,
      y: y + offsetY
    });
  }

  onResizePrelayer(event, direction, ref, delta) {
    const { width, height } = this.props.prelayer;

    this.actions.updatePrelayer({
      width: width + delta.width,
      height: height + delta.height
    });
  }

  // Navigation methods
  async onClickNavigationButton(event, isSelected) {
    const { currentTarget, target } = event;
    const { method, reset } = event.currentTarget.dataset;

    this.stageMethod && !reset
      ? await this.stageMethod.call(this)
      : this.reset();

    if (method) {
      process.nextTick(
        this[method].bind(
          this,
          {
            currentTarget,
            target
          },
          isSelected
        )
      );
    }
  }

  updateHistory(event) {
    const { position } = this.props.history;
    const { stage } = event.currentTarget.dataset;

    this.historyActions.updateHistory({
      position: stage === "undo" ? position - 1 : position + 1,
      allow: true
    });
  }

  reset(ignoreTemplayer, toggleHistoryFill) {
    const { templayer, stage } = this.props;

    if (!ignoreTemplayer && templayer) {
      this.actions.changeSelectedLayer(templayer);
    }

    this.uiActions.resetButtons();
    this.uiActions.resetSelects();
    this.uiActions.resetSliders();

    this.actions.changePageCursor("default");
    this.actions.setPrelayer(null);
    this.actions.setCrop(null);
    this.actions.setTemplayer(null);
    this.actions.updateStage(null);
    this.actions.updateLayers({
      visible: true
    });

    if (stage === "resizeWorkspace") {
      this.actions.setPreworkspaceSettings(null);
      this.actions.updateLayers({
        isVisible: true
      });
    }

    if (toggleHistoryFill) {
      this.actions.toggleHistoryFill(true);
    }
  }

  resizeWorkspace() {
    const { workspaceSettings } = this.props;

    this.actions.setPreworkspaceSettings(workspaceSettings);
    this.actions.updateStage("resizeWorkspace");
    this.actions.updateLayers({
      isVisible: false
    });
  }

  filterLayer() {
    const { selectedLayer } = this.props;
    const { current: ref } = this.links.selectedLayerRef;

    this.actions.updateSelectedLayer({
      nextRender: true,
      nextCache: true
    });

    this.actions.updateStage("filterLayer");
    this.actions.setTemplayer(selectedLayer);
  }

  flipXLayer() {
    const { scaleX } = this.props.selectedLayer;

    this.actions.updateSelectedLayer({
      scaleX: scaleX === -1 ? 1 : -1,
      nextRender: true
    });

    this.actions.toggleHistoryFill(true);
  }

  rotateLayer() {
    const { rotation = 0 } = this.props.selectedLayer;

    this.actions.updateSelectedLayer({
      rotation: rotation >= 270 ? 0 : rotation + 90,
      nextRender: true
    });

    this.actions.toggleHistoryFill(true);
  }

  async moveLayerToPrelayer() {
    const { current: ref } = this.links.selectedLayerRef;
    const { selectedLayer } = this.props;
    const { nextRender, url } = selectedLayer;
    const { width, height, base64, img } = await this.createImage(ref);

    // Убираем эти свойства
    // Так как мы уже создали изображение
    // Включив эти свойства, за счет этого
    // Если оставить эти свойства
    // Эффект наложится
    const normalizedSelectedLayer = clearFields(
      selectedLayer,
      this.layerClearFields
    );

    this.actions.updateStage("transformLayer");
    this.actions.updateLayer({
      ...selectedLayer,
      visible: false
    });

    this.actions.setPrelayer({
      ...normalizedSelectedLayer,
      ...this.getOffsets(width, height),
      width,
      height,
      url: nextRender ? base64 : url,
      native: img,
      // Disable next render
      nextRender: false
    });
  }

  createTextPrelayer() {
    const prelayer = createLayer("text");

    this.actions.updateStage("createTextLayer");
    this.actions.setPrelayer({
      ...prelayer,
      type: "text"
    });
  }

  changePageCursorToMove() {
    this.actions.changePageCursor("move");
  }

  async cropLayer() {
    const { current: ref } = this.links.selectedLayerRef;
    const { width, height, base64, img } = await this.createImage(ref);
    const { selectedLayer } = this.props;
    const { url, nextRender } = selectedLayer;

    const normalizedSelectedLayer = clearFields(
      selectedLayer,
      this.layerClearFields
    );

    this.actions.changeSelectedLayer({
      ...normalizedSelectedLayer,
      ...this.getOffsets(width, height),
      width,
      height,
      url: nextRender ? base64 : url,
      native: img,
      // Disable next render
      nextRender: false
    });

    this.actions.changePageCursor("crosshair");
    this.actions.updateStage("cropLayer");
  }

  // Text manager methods
  onUpdatePrelayerText(event) {
    const { innerHTML } = event.target;
    const innerText = innerHTML
      .replace(/(<div>|<\/div>|<br>)/g, "\r\n")
      .replace(/&nbsp;/g, "")
      .trim();

    this.actions.updatePrelayer({
      text: innerText,
      html: innerHTML
    });
  }

  onChangeFontFamily({ value: fontFamily }) {
    this.updateTextPrelayer("fontFamily", fontFamily, "changeFontFamily");
  }

  onChangeFontSize({ value: fontSize }) {
    this.updateTextPrelayer("fontSize", fontSize, "changeFontSize");
  }

  onChangeTextColor({ hex: color }) {
    this.updateTextPrelayer("color", color, "changeTextColor");
  }

  onChangeTextStyling(event, isSelected) {
    const { style } = event.currentTarget.dataset;
    const { fontStyle } = this.props.prelayer.styles.canvas;
    const stylename = style === "italic" ? "fontStyle" : "fontWeight";
    const crossStyle = `${fontStyle || ""}*${style}`;

    this.updateTextPrelayer(stylename, isSelected ? crossStyle : null);
  }

  onChangeTextDecorating(event, isSelected) {
    this.updateTextPrelayer("fontDecoration", isSelected ? "underline" : null);
  }

  onChangeTextAligning(event) {
    const { style } = event.currentTarget.dataset;
    this.updateTextPrelayer("align", style);
  }

  updateTextPrelayer(type, value, uiActionName) {
    const { prelayer } = this.props;
    const updatedPrelayer = prelayerCrossStyle(prelayer, type, value);

    if (uiActionName) this.uiActions[uiActionName](value);

    this.actions.updatePrelayer(updatedPrelayer);
  }

  render() {
    const {
      layers,
      prelayer,
      stage,
      hasLayers,
      visibleLayers,
      workspaceSettings,
      preworkspaceSettings,
      textManager,
      hasActiveNavButton,
      pageCursor,
      hasPrelayerToLayer,
      crop,
      hasCrop,
      historyStage
    } = this.props;

    return (
      <MainContext.Provider value={this.providerValue}>
        <Dropzone>
          <Page
            cursor={pageCursor}
            onMouseDown={this.onLayerDragStart}
            onMouseUp={this.onLayerDragEnd}
            column
          >
            <Cropzone crop={crop} />
            <Container column fullHeight>
              <Header
                historyStage={historyStage}
                stage={stage}
                preworkspaceSettings={preworkspaceSettings}
                hasLayers={hasLayers}
                workspaceSettings={workspaceSettings}
                hasActiveNavButton={hasActiveNavButton}
              />
              <DropzoneContent hasLayers={hasLayers} />
              <LayersManager layers={layers} hasLayers={hasLayers} />
              <SettingsManager
                textManager={textManager}
                hasLayers={hasLayers}
                stage={stage}
                hasCrop={hasCrop}
                hasPrelayerToLayer={hasPrelayerToLayer}
              />
              <Workspace
                stage={stage}
                prelayer={prelayer}
                layers={visibleLayers}
                hasLayers={hasLayers}
                preworkspaceSettings={preworkspaceSettings}
                workspaceSettings={workspaceSettings}
              />
            </Container>
          </Page>
        </Dropzone>
      </MainContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  mainState: state.main,
  history: state.history,
  preworkspaceSettings: state.main.preworkspaceSettings,
  imageHistory: state.main.imageHistory,
  isHistoryFill: state.main.isHistoryFill,
  crop: state.main.crop,
  templayer: state.main.templayer,
  stage: state.main.stage,
  layers: state.main.layers,
  prelayer: state.main.prelayer,
  pageCursor: state.main.pageCursor,
  hasHistory: hasHistory(state),
  stateFromHistory: getStateFromHistory(state),
  historyStage: getHistoryStage(state),
  hasCrop: hasCrop(state),
  hasActiveNavButton: hasActiveNavButton(state),
  selectedLayer: getSelectedLayer(state),
  textManager: getTextManager(state),
  visibleLayers: getVisibleLayers(state),
  hasLayers: hasLayers(state),
  hasPrelayerToLayer: hasPrelayerToLayer(state),
  workspaceSettings: getWorkspaceSettings(state)
});

export default connect(mapStateToProps)(Main);
