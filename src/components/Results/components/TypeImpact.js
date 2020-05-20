export default class TypeImpact{

  constructor(id, category, impact, effort, display) {
    this.id = id;
    this.category = category;
    this.impact = impact;
    this.effort = effort;
    this.display = display;
  }

  getSortOrder() {
    return this.impact - this.effort;
  }

  getImpactString() {
    let s = "N/A";
    if (this.impact === 1) s = "LOW"
    if (this.impact === 2) s = "MEDIUM"
    if (this.impact === 3) s = "HIGH"
    return s
  }

  getEffortString() {
    let s = "N/A";
    if (this.effort === 1) s = "LOW"
    if (this.effort === 2) s = "MEDIUM"
    if (this.effort === 3) s = "HIGH"
    return s
  }
}
