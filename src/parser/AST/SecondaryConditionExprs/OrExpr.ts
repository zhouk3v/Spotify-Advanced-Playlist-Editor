import { Expr } from "./Expr";

class OrExpr implements Expr {
  expr1: Expr;
  expr2: Expr;
  constructor(expr1: Expr, expr2: Expr) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }
  evaluate(track: SpotifyApi.TrackObjectFull) {
    return this.expr1.evaluate(track) || this.expr2.evaluate(track);
  }
}

export default OrExpr;