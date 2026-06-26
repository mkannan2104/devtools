/**
 * Shared Monaco Editor lifecycle helpers.
 * Suppresses async teardown errors (e.g. getFullModelRange on null model)
 * that occur during unmount, navigation, tab switches, and resize toggles.
 */

const LIFECYCLE_ERROR_PATTERNS = [
  "InstantiationService",
  "domNode",
  "disposed",
  "getFullModelRange",
  "null model",
  "TextModel",
  "model is disposed",
  "Editor has been disposed",
] as const;

export function isMonacoLifecycleError(message: string): boolean {
  const msg = message || "";
  return LIFECYCLE_ERROR_PATTERNS.some((pattern) => msg.includes(pattern));
}

type MonacoLike = {
  onUnexpectedError?: (err: unknown) => void;
  editor?: {
    defineTheme: (name: string, theme: unknown) => void;
  };
};

export function setupMonacoErrorHandler(monaco: MonacoLike): void {
  monaco.onUnexpectedError = (err: unknown) => {
    const msg =
      (err as { message?: string })?.message ||
      (err != null ? String(err) : "");
    if (isMonacoLifecycleError(msg)) return;
    console.error(err);
  };

  monaco.editor?.defineTheme("custom-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: { "editor.background": "#161B22" },
  });
}

type EditorLike = {
  _isDisposed?: boolean;
  isDisposed?: () => boolean;
  setModel?: (model: unknown) => void;
  getModel?: () => unknown;
  layout?: (...args: unknown[]) => void;
  updateOptions?: (...args: unknown[]) => void;
  setValue?: (...args: unknown[]) => void;
  dispose?: () => void;
};

export interface PatchEditorOptions {
  containerRef?: { current: HTMLElement | null };
  onBeforeDispose?: () => void;
}

function makeSafe(editor: EditorLike, originalFn: (...args: unknown[]) => unknown) {
  return (...args: unknown[]) => {
    if (
      editor._isDisposed ||
      (typeof editor.isDisposed === "function" && editor.isDisposed())
    ) {
      return;
    }
    try {
      return originalFn(...args);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "";
      if (isMonacoLifecycleError(msg)) return;
      throw err;
    }
  };
}

function patchSingleEditor(
  editor: EditorLike,
  options: PatchEditorOptions = {}
): void {
  editor._isDisposed = false;

  if (editor.setModel) {
    editor.setModel = makeSafe(editor, editor.setModel.bind(editor));
  }
  if (editor.layout) {
    editor.layout = makeSafe(editor, editor.layout.bind(editor));
  }
  if (editor.updateOptions) {
    editor.updateOptions = makeSafe(editor, editor.updateOptions.bind(editor));
  }
  if (editor.setValue) {
    editor.setValue = makeSafe(editor, editor.setValue.bind(editor));
  }

  if (!editor.dispose) return;

  const originalDispose = editor.dispose.bind(editor);
  editor.dispose = () => {
    editor._isDisposed = true;

    try {
      options.onBeforeDispose?.();
    } catch {
      /* ignore */
    }

    try {
      if (options.containerRef?.current) {
        options.containerRef.current.style.display = "none";
      }
    } catch {
      /* already removed */
    }

    try {
      editor.setModel?.(null);
    } catch {
      /* model already detached */
    }

    try {
      originalDispose();
    } catch {
      /* ignore disposal errors */
    }
  };
}

export function patchEditorLifecycle(
  editor: EditorLike,
  options: PatchEditorOptions = {}
): void {
  patchSingleEditor(editor, options);
}

type DiffEditorLike = EditorLike & {
  getOriginalEditor?: () => EditorLike;
  getModifiedEditor?: () => EditorLike;
};

export function patchDiffEditorLifecycle(
  diffEditor: DiffEditorLike,
  options: PatchEditorOptions = {}
): void {
  try {
    diffEditor.getOriginalEditor?.();
    diffEditor.getModifiedEditor?.();
  } catch {
    /* diff editor not fully initialized */
  }

  const originalEditor = diffEditor.getOriginalEditor?.();
  const modifiedEditor = diffEditor.getModifiedEditor?.();

  if (originalEditor) patchSingleEditor(originalEditor);
  if (modifiedEditor) patchSingleEditor(modifiedEditor);

  patchSingleEditor(diffEditor, options);
}
