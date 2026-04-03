// Hàm tiện ích để kết hợp nhiều className thành một chuỗi duy nhất, bỏ qua các giá trị falsy
export function cn(...classNames: Array<string | undefined | null | false>) {
  return classNames.filter(Boolean).join(' ');
}
