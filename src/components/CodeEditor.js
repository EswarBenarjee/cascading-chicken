import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCode } from "../features/game/gameSlice";
import CodeMirror from "@uiw/react-codemirror";
import { Decoration, ViewPlugin } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

const CodeEditor = () => {
  const userCode = useSelector((state) => state.game.code);
  const dispatch = useDispatch();

  const lockedHeader = `.lilly-pad-1 {\n\n}\n\n`;

  const fullCode = lockedHeader + userCode;

  const handleChange = useCallback(
    (value) => {
      // Remove the locked header before saving to Redux
      if (value.startsWith(lockedHeader)) {
        dispatch(setCode(value.slice(lockedHeader.length)));
      }
    },
    [dispatch, lockedHeader]
  );

  // ViewPlugin to mark locked header as read-only
  const lockHeaderPlugin = useMemo(() => {
    return ViewPlugin.fromClass(
      class {
        decorations;

        constructor(view) {
          const builder = new RangeSetBuilder();
          const lines = lockedHeader.split("\n").length;

          // Lock the lines equal to the header
          for (let i = 0; i < lines; i++) {
            const line = view.state.doc.line(i + 1);
            builder.add(
              line.from,
              line.to,
              Decoration.mark({
                inclusive: true,
                attributes: {
                  contenteditable: "false",
                  style: "background: #f3f3f3;",
                },
              })
            );
          }

          this.decorations = builder.finish();
        }

        update(update) {}
      },
      {
        decorations: (v) => v.decorations,
      }
    );
  }, [lockedHeader]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
      <CodeMirror
        value={fullCode}
        height="200px"
        extensions={[lockHeaderPlugin]}
        onChange={handleChange}
      />
    </div>
  );
};

export default CodeEditor;
