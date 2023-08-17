import "./index.css";
import { SelectOptions } from "./utils/types";
import { Editor } from "./editor";
import { deepEqual } from "./utils/objEqual";

window.addEventListener("load", () => {
  const toolbar = document.getElementById("toolbar");
  let curSelection = document.getElementById("rectangle-button");
  let lastSelection = document.getElementById("rectangle-button");
  const cursorPosition = document.getElementById("cur-position");
  const canvas = document.getElementById("drawing-area");

  let editor: Editor;

  const findCurPos = (e: MouseEvent) => {
    if (cursorPosition) {
      cursorPosition.innerText = `Cursor position: (x:${e.offsetX}, y:${e.offsetY})`;
    }
  };

  // On mouse down
  const mouseDraw = (e: MouseEvent) => {
    e.preventDefault();
    if (e.target) {
      const startPos = { x: e.offsetX, y: e.offsetY };

      // When mouse moves after it's down
      const showPreview = (previewEvent: Event) => {
        if (previewEvent instanceof MouseEvent) {
          if (
            !deepEqual(startPos, {
              x: previewEvent.offsetX,
              y: previewEvent.offsetY,
            })
          ) {
            editor.renderPreviw(
              startPos.x,
              startPos.y,
              previewEvent.offsetY - startPos.y,
              previewEvent.offsetX - startPos.x
            );
          }
        }
      };
      e.target.addEventListener("mousemove", showPreview);

      // On mouse up
      const mouseConfirm = (event: Event) => {
        if (event instanceof MouseEvent) {
          const endPos = { x: event.offsetX, y: event.offsetY };


          if (deepEqual(startPos, endPos)) {
            editor.addAuto(startPos.x, startPos.y);
          } else {
            editor.addAuto(
              startPos.x,
              startPos.y,
              endPos.y - startPos.y,
              endPos.x - startPos.x
            );
          }
          if (e.target) {
            e.target.removeEventListener("mouseup", mouseConfirm);
            e.target.removeEventListener("mousemove", showPreview);
          }
        }
      };
      e.target.addEventListener("mouseup", mouseConfirm);
    }
  };

  if (canvas && canvas instanceof HTMLCanvasElement) {
    editor = new Editor(canvas);
    canvas.addEventListener("mousemove", findCurPos);
    canvas.addEventListener("mousedown", mouseDraw);
  } else {
    throw TypeError("Cant work with provided canvas");
  }

  // Highlighting recently pressed button
  if (curSelection && toolbar) {
    curSelection.style.backgroundColor = "green";

    editor.onSelectionChange = (s) => {
      if (curSelection && lastSelection) {
        if (curSelection.dataset.selection !== s) {
          const tmp = lastSelection;
          curSelection.style.backgroundColor = lastSelection.style.backgroundColor;
          lastSelection.style.backgroundColor = "green";
          lastSelection = curSelection;
          curSelection = tmp;
        }
      }
    };

    window.addEventListener("focus", () => {
      if (curSelection && lastSelection) {
        if (
          (curSelection.dataset.selection as SelectOptions) !== editor.selection
        ) {

          const tmp = lastSelection;
          curSelection.style.backgroundColor = lastSelection.style.backgroundColor;
          lastSelection.style.backgroundColor = "green";
          lastSelection = curSelection;
          curSelection = tmp;
        }
      }
    });

    toolbar.addEventListener("click", (e) => {
      if (e.target && !(e.target instanceof HTMLButtonElement)) return;
      else if (curSelection) {
        const target = e.target as HTMLElement;
        if (target.dataset.selection == "CLEAR") {
          editor.clear();
          return;
        }

        lastSelection = curSelection;
        curSelection.style.backgroundColor = target.style.backgroundColor;
        curSelection = e.target as HTMLElement;
        editor.changeSelection(target.dataset.selection as SelectOptions);
        curSelection.style.backgroundColor = "green";
      }
    });
  }
});
