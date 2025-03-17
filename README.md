
## Existing text editors:
# full kit:
    - CKEditor
    - TinyMCE
    - TipTop https://tiptap.dev/docs/examples
# basic kit:
    - slate https://www.slatejs.org/examples/richtext
    - Quill

## Export format:
- HTML
- JSON

# tip top structure:
- editor object (useEditor):
    - content (initial and updated, html or json)
    - extensions (StarterKit, and more)
    - onUpdate function: use getJSON or getHtml or getText
- components:
    - MenuBar (editor) 
    - EditorContent (editor)