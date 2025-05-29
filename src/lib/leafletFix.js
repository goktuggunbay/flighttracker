import L from "leaflet";
import "leaflet-rotatedmarker";

const originalSetPos = L.Marker.prototype._setPos;
L.Marker.include({
  _setPos: function (pos) {
    originalSetPos.call(this, pos);
    if (this.options.rotationAngle) {
      this._icon.style.transform += ` rotate(${this.options.rotationAngle}deg)`;
    }
  },
});
