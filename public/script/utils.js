const getName = (arn) => arn.split(":").slice(-1)[0];

export { getName }