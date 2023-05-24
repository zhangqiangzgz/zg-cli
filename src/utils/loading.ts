import ora from 'ora'

export async function loading(message: string, callback: () => unknown) {
  const spinner = ora(message)
  spinner.start()
  const result = await callback()
  spinner.succeed()
  return result
}