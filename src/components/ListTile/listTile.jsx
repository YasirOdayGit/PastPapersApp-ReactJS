import React from "react";
import "./listTileS.scss";
function ListTile(props) {
  return (
    <div className="listTile">
      <div className="pre">
        {props.prefixIcon != null ? (
          <div className="prefixIcon">{props.prefixIcon}</div>
        ) : null}
        {props.item != null ? props.item : "NaN"}
      </div>
      {props.suffixIcon != null ? (
        <div className="suffixIcon" onClick={props.onClick}>
          {props.suffixIcon}
        </div>
      ) : null}
    </div>
  );
}

export default ListTile;
