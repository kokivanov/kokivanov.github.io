import "./index.css";
import { SelectOptions } from "./elements";
import { Editor } from "./editor";

window.addEventListener("load", () => {
  const toolbar = document.getElementById("toolbar");
  let curSelection = document.getElementById("rectangle-button");

  let editor: Editor;

  if (curSelection && toolbar) {
    curSelection.style.backgroundColor = "green";
    toolbar.addEventListener("click", (e) => {
      if (e.target && !(e.target instanceof HTMLButtonElement)) return;
      else if (curSelection) {
        const target = e.target as HTMLElement;
        curSelection.style.backgroundColor = target.style.backgroundColor;
        curSelection = e.target as HTMLElement;
        curSelection.style.backgroundColor = "green";
        editor.changeSelection(target.dataset.selection as SelectOptions);
      }
    });
  }

  const findCurPos = (e: MouseEvent) => {
    if (cursorPosition) {
      cursorPosition.innerText = `Cursor position: (x:${e.offsetX}, y:${e.offsetY})`;
    }
  };

  const cursorPosition = document.getElementById("cur-position");
  const canvas = document.getElementById("drawing-area");

  if (canvas && canvas instanceof HTMLCanvasElement) {
    editor = new Editor(canvas);
    canvas.addEventListener("mousemove", (e) => findCurPos(e));
    canvas.addEventListener("click", (e) =>
      editor.addAuto(e.offsetX, e.offsetY)
    );
  } else {
    throw TypeError("Cant work with provided canvas");
  }
});
