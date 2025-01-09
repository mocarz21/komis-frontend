export const lodgingsSave = data => {
  return {
    ...data,
    facilities: data?.facilities.join(","),
  };
};
