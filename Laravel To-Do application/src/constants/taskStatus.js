export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const STATUS_OPTIONS = [
  { value: TASK_STATUS.TODO, label: 'To Do' },
  { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TASK_STATUS.DONE, label: 'Done' },
]

export const STATUS_COLOR = {
  [TASK_STATUS.TODO]: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
  [TASK_STATUS.IN_PROGRESS]:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  [TASK_STATUS.DONE]: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
}
