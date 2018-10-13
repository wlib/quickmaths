function getQuerys() {
  const query = {};
  const pairs = document.location.search.substr(1).split("&");
  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    query[decodeURIComponent(key)] = JSON.parse(
      decodeURIComponent(value || "")
    );
  });
  return query;
}

const queries = getQuerys();

export default {
  correctAnswer: undefined,
  type: queries.type,
  range: queries.range
};
