// components/TextEditor.js
import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Button } from '@mui/material'
import styles from './TextEditor.module.css'
import draftToHtml from 'draftjs-to-html'

const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })

const TextEditor = ({ setHtml }) => {

  const [editorState, setEditorState] = useState(() => {
    let initialState = EditorState.createEmpty()
    if (typeof window !== 'undefined') {
      const savedContent = window.localStorage.getItem('editorContent')
      if (savedContent) {
        try {
          const contentState = convertFromRaw(JSON.parse(savedContent))
          initialState = EditorState.createWithContent(contentState)
        } catch (error) {
          window.localStorage.removeItem('editorContent')
        }
      }
    }

    return initialState
  })

  const handleClear = () => {
    setEditorState(EditorState.createEmpty())
    window.localStorage.removeItem('editorContent')
  }

  const onEditorStateChange = useCallback(
    newState => {
      setEditorState(newState)
      setHtml(draftToHtml(convertToRaw(newState.getCurrentContent())))
    },
    [setHtml]
  )

  const handleSave = () => {
    const contentState = editorState.getCurrentContent()
    const rawContent = convertToRaw(contentState)
    const serializedContent = JSON.stringify(rawContent)
    window.localStorage.setItem('editorContent', serializedContent)
    setHtml(draftToHtml(rawContent))
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <DynamicEditor
        toolbarClassName={styles.toolbar}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <Button onClick={handleSave} sx={{ margin: '10px 10px 0px 0px' }} size='small' variant='contained'>
        Save
      </Button>
      <Button variant='contained' sx={{ marginTop: '10px' }} size='small' onClick={handleClear}>
        Clear
      </Button>
    </div>
  )
}

export default TextEditor
