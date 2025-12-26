export function decideAction(confidence: number) {
  if (confidence >= 0.8) {
    return {
      requiresHumanReview: false,
      reasoning: "High confidence memory applied automatically"
    };
  }

  if (confidence >= 0.5) {
    return {
      requiresHumanReview: true,
      reasoning: "Medium confidence memory, suggesting human review"
    };
  }

  return {
    requiresHumanReview: true,
    reasoning: "Low confidence memory, escalating to human review"
  };
}
