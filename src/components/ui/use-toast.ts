export function useToast() {
  return {
    toast: (message: string) => alert(message)
  }
}
