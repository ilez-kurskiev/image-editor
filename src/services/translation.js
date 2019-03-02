export const getLanguage = () =>
  localStorage.getItem("application-language") || "en";

export const loadTranslationWithComponent = componentLoader => {
  const language = getLanguage();

  return import(`translations/${language}`).then(translation => {
    window.Translation = translation.default;
    return componentLoader();
  });
};

export const loadTranslation = () => {
  const language = getLanguage();

  return import(`translations/${language}`).then(translation => {
    window.Translation = translation.default;
  });
};
