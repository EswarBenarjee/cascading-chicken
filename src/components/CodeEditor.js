import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCode } from "../features/game/gameSlice";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, Decoration, ViewPlugin } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

const CodeEditor = () => {
  const userCode = useSelector((state) => state.game.code);
  const dispatch = useDispatch();

  const lockedStart = `.lilly-pad-1 {\n`;
  const lockedEnd = `}`;

  const fullCode = lockedStart + userCode + "\n" + lockedEnd;

  const handleChange = useCallback(
    (value) => {
      if (value.startsWith(lockedStart) && value.endsWith("\n" + lockedEnd)) {
        const editablePart = value.slice(
          lockedStart.length,
          value.length - lockedEnd.length - 1
        );
        dispatch(setCode(editablePart));
      }
    },
    [dispatch, lockedStart, lockedEnd]
  );

  const lockHeaderPlugin = useMemo(() => {
    return ViewPlugin.fromClass(
      class {
        decorations;

        constructor(view) {
          const builder = new RangeSetBuilder();
          const startLen = lockedStart.length;
          const totalLen = view.state.doc.length;
          const endStart = totalLen - lockedEnd.length;

          builder.add(
            0,
            startLen,
            Decoration.mark({
              attributes: {
                contenteditable: "false",
                style: "background: #f3f3f3;",
              },
            })
          );

          builder.add(
            endStart,
            totalLen,
            Decoration.mark({
              attributes: {
                contenteditable: "false",
                style: "background: #f3f3f3;",
              },
            })
          );

          this.decorations = builder.finish();
        }

        update() {}
      },
      {
        decorations: (v) => v.decorations,
      }
    );
  }, [lockedStart, lockedEnd]);

  const lockInputExtension = useMemo(() => {
    return EditorView.domEventHandlers({
      beforeinput: (event, view) => {
        const pos = view.state.selection.main.from;
        const startLen = lockedStart.length;
        const endStart = view.state.doc.length - lockedEnd.length;

        if (event.inputType === "deleteContentBackward" && pos <= startLen) {
          event.preventDefault();
        }
        if (event.inputType === "deleteContentForward" && pos >= endStart - 1) {
          event.preventDefault();
        }
        if (event.inputType === "Delete" && pos >= endStart - 1) {
          event.preventDefault();
        }

        if (pos < startLen || pos >= endStart) {
          event.preventDefault();
        }
      },
      keydown: (event, view) => {
        const pos = view.state.selection.main.from;
        const startLen = lockedStart.length;
        const endStart = view.state.doc.length - lockedEnd.length;

        if (event.key === "Backspace" && pos <= startLen) {
          event.preventDefault();
        }

        if (event.key === "Delete" && pos >= endStart) {
          event.preventDefault();
        }

        if (event.key === "ArrowLeft" && pos <= startLen) {
          event.preventDefault();
        }

        if (event.key === "ArrowRight" && pos >= endStart) {
          event.preventDefault();
        }
      },
    });
  }, [lockedStart, lockedEnd]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
      <CodeMirror
        value={fullCode}
        height="200px"
        extensions={[lockHeaderPlugin, lockInputExtension]}
        onChange={handleChange}
        style={{
          textAlign: "left",
        }}
      />
    </div>
  );
};

export default CodeEditor;
