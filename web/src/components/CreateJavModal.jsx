import { useEffect, useState } from 'react'
import AppModal from '@/components/AppModal'
import { zh } from '@/utils/i18n'
import { getErrorMessage } from '@/utils/errors'

export default function CreateJavModal({ open, saving, onClose, onCreate }) {
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setCode('')
    setTitle('')
    setError('')
  }, [open])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    if (!normalizedCode) {
      setError(zh('请输入番号', 'Enter a JAV code'))
      return
    }
    setError('')
    try {
      await onCreate?.({ code: normalizedCode, title: title.trim() })
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <AppModal
      open={open}
      onClose={() => !saving && onClose?.()}
      closeDisabled={saving}
      ariaLabel={zh('新增作品', 'Add work')}
      contentClassName="w-[min(92vw,460px)] overflow-hidden rounded-xl bg-white shadow-2xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">{zh('新增作品', 'Add work')}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {zh('创建后可在作品编辑中补充演员、标签、评分和封面。', 'Add cast, tags, rating, and cover after creating the work.')}
          </p>
        </div>
        <div className="space-y-4 p-5">
          <label className="block text-sm font-medium text-gray-800">
            {zh('番号', 'JAV code')}
            <input
              autoFocus
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="例如 ABC-001"
              className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={saving}
            />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            {zh('标题（可选）', 'Title (optional)')}
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={zh('留空时使用番号作为标题', 'Defaults to the JAV code')}
              className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={saving}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4">
          <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={onClose} disabled={saving}>
            {zh('取消', 'Cancel')}
          </button>
          <button type="submit" className={`rounded-md px-4 py-2 text-sm font-medium text-white ${saving ? 'cursor-wait bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? zh('保存中...', 'Saving...') : zh('保存作品', 'Save work')}
          </button>
        </div>
      </form>
    </AppModal>
  )
}
