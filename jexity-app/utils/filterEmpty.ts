function notEmpty<TValue>(value: TValue | undefined | null): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}

export default notEmpty;
