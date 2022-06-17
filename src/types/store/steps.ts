export type ActionStep = {
  type: string,
  payload: {
    step: number,
  },
};

export type StepsState = {
  step: number,
};
