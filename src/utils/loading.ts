import ora from 'ora'

export async function loading(message: string, callback: () => unknown) {
  const spinner = ora(message)
  spinner.start()
  const result = await callback()
  spinner.succeed()
  return result
}

export function loadingFn(message: string, callback: (...args: any[]) => any) {
  const spinner = ora(message)
  return async (...args: any[]) => {
    spinner.start()
    const result = await callback(...args)
    spinner.succeed()
    return result
  }
}