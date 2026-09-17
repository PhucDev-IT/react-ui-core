import React, {useEffect} from 'react';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {Field} from '../Field/Field';
import {cx} from '../../utils/cx';
import './richtexteditor.scss';

export interface RichTextEditorProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
  className?: string;
}

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  onClick: () => void;
};

function ToolbarButton({active, disabled, title, children, onClick}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={cx('ui-rte__button', active && 'is-active')}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active || undefined}
      onMouseDown={event => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="ui-rte__divider" aria-hidden />;
}

export function RichTextEditor({
  label,
  hint,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  minHeight = 220,
  disabled = false,
  className,
}: RichTextEditorProps) {
  const controlled = value !== undefined;
  const initialContent = controlled ? value : defaultValue;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      }),
      Placeholder.configure({placeholder}),
    ],
    content: initialContent,
    editable: !disabled,
    onUpdate: ({editor: currentEditor}) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    if (!editor || !controlled) return;
    const next = value || '';
    if (editor.getHTML() !== next) {
      editor.commands.setContent(next, {emitUpdate: false});
    }
  }, [controlled, editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.extensionManager.extensions.find(extension => extension.name === 'placeholder')?.options;
  }, [editor, placeholder]);

  const setLink = () => {
    if (!editor || disabled) return;
    const previous = editor.getAttributes('link').href as string | undefined;
    const href = window.prompt('URL', previous || 'https://');
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({href: href.trim()}).run();
  };

  const clearFormatting = () => {
    editor?.chain().focus().unsetAllMarks().clearNodes().run();
  };

  return (
    <Field label={label} hint={hint}>
      <div className={cx('ui-rte', disabled && 'is-disabled', className)}>
        <div className="ui-rte__toolbar" role="toolbar" aria-label="Rich text formatting">
          <ToolbarButton title="Hoàn tác" disabled={!editor?.can().chain().focus().undo().run() || disabled} onClick={() => editor?.chain().focus().undo().run()}>↶</ToolbarButton>
          <ToolbarButton title="Làm lại" disabled={!editor?.can().chain().focus().redo().run() || disabled} onClick={() => editor?.chain().focus().redo().run()}>↷</ToolbarButton>
          <Divider />
          <ToolbarButton title="Đoạn văn" active={editor?.isActive('paragraph')} disabled={disabled} onClick={() => editor?.chain().focus().setParagraph().run()}>P</ToolbarButton>
          <ToolbarButton title="Heading 1" active={editor?.isActive('heading', {level: 1})} disabled={disabled} onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()}>H1</ToolbarButton>
          <ToolbarButton title="Heading 2" active={editor?.isActive('heading', {level: 2})} disabled={disabled} onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}>H2</ToolbarButton>
          <ToolbarButton title="Heading 3" active={editor?.isActive('heading', {level: 3})} disabled={disabled} onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}>H3</ToolbarButton>
          <Divider />
          <ToolbarButton title="In đậm" active={editor?.isActive('bold')} disabled={disabled} onClick={() => editor?.chain().focus().toggleBold().run()}><strong>B</strong></ToolbarButton>
          <ToolbarButton title="In nghiêng" active={editor?.isActive('italic')} disabled={disabled} onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton>
          <ToolbarButton title="Gạch chân" active={editor?.isActive('underline')} disabled={disabled} onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></ToolbarButton>
          <ToolbarButton title="Gạch ngang" active={editor?.isActive('strike')} disabled={disabled} onClick={() => editor?.chain().focus().toggleStrike().run()}><s>S</s></ToolbarButton>
          <Divider />
          <ToolbarButton title="Danh sách dấu chấm" active={editor?.isActive('bulletList')} disabled={disabled} onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
          <ToolbarButton title="Danh sách đánh số" active={editor?.isActive('orderedList')} disabled={disabled} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
          <ToolbarButton title="Trích dẫn" active={editor?.isActive('blockquote')} disabled={disabled} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>❝</ToolbarButton>
          <ToolbarButton title="Code block" active={editor?.isActive('codeBlock')} disabled={disabled} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>&lt;/&gt;</ToolbarButton>
          <Divider />
          <ToolbarButton title="Liên kết" active={editor?.isActive('link')} disabled={disabled} onClick={setLink}>Link</ToolbarButton>
          <ToolbarButton title="Đường phân cách" disabled={disabled} onClick={() => editor?.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
          <ToolbarButton title="Xóa định dạng" disabled={disabled} onClick={clearFormatting}>Clear</ToolbarButton>
        </div>

        <div className="ui-rte__content" style={{minHeight}}>
          <EditorContent editor={editor} />
        </div>

        <div className="ui-rte__footer">
          <span>Tiptap editor</span>
          <span>{editor?.getText().length || 0} ký tự</span>
        </div>
      </div>
    </Field>
  );
}
