const clearLocalStorage = () => {
  localStorage.removeItem("lang");
  localStorage.removeItem("theme");
  localStorage.removeItem("languageId");
  localStorage.removeItem("isReversed");
};

export default clearLocalStorage;
