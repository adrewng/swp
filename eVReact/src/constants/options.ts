// Vehicle form options constants

export type Option<T extends string | number = string | number> = {
  value: T
  label: string
}
export const SEATS_OPTIONS = [
  { value: 1, label: '1 chỗ' },
  { value: 2, label: '2 chỗ' },
  { value: 4, label: '4 chỗ' },
  { value: 5, label: '5 chỗ' },
  { value: 7, label: '7 chỗ' },
  { value: 9, label: '9 chỗ' }
]

export const POWER_OPTIONS = [
  { value: '200', label: '< 200W' },
  { value: '250', label: '200 - 250W' },
  { value: '350', label: '251 - 350W' },
  { value: '500', label: '351 - 500W' },
  { value: '1000', label: '501 - 1000W' },
  { value: '1000+', label: '> 1000W' }
]

export const MILEAGE_OPTIONS = [
  { value: '1000', label: '< 1,000 km' },
  { value: '5000', label: '1,000 - 5,000 km' },
  { value: '10000', label: '5,000 - 10,000 km' },
  { value: '20000', label: '10,000 - 20,000 km' },
  { value: '50000', label: '20,000 - 50,000 km' },
  { value: '100000', label: '50,000 - 100,000 km' },
  { value: '100000+', label: '> 100,000 km' }
]

export const COLOR_OPTIONS = [
  { value: 'white', label: 'Trắng' },
  { value: 'black', label: 'Đen' },
  { value: 'silver', label: 'Bạc' },
  { value: 'gray', label: 'Xám' },
  { value: 'red', label: 'Đỏ' },
  { value: 'blue', label: 'Xanh dương' },
  { value: 'green', label: 'Xanh lá' },
  { value: 'yellow', label: 'Vàng' },
  { value: 'orange', label: 'Cam' },
  { value: 'brown', label: 'Nâu' },
  { value: 'purple', label: 'Tím' },
  { value: 'other', label: 'Khác' }
]

export const CAPACITY_OPTIONS = [
  { value: '12', label: '12Ah' },
  { value: '20', label: '20Ah' },
  { value: '30', label: '30Ah' },
  { value: '40', label: '40Ah' },
  { value: '50', label: '50Ah' },
  { value: '60', label: '60Ah' },
  { value: '70', label: '70Ah' },
  { value: '80', label: '80Ah' },
  { value: '100', label: '100Ah' },
  { value: '120', label: '120Ah' },
  { value: '150', label: '150Ah' },
  { value: '200', label: '200Ah' },
  { value: 'other', label: 'Khác' }
]

export const VOLTAGE_OPTIONS = [
  // Phụ/Low voltage
  { value: '12v', label: '12V (phụ/aux)' },
  { value: '24v', label: '24V (truck/aux)' },

  // Light EV
  { value: '36v', label: '36V (e-bike)' },
  { value: '48v', label: '48V (e-bike/scooter)' },
  { value: '60v', label: '60V (scooter)' },
  { value: '72v', label: '72V (scooter)' },
  { value: '96v', label: '96V (moto hiệu năng)' }, // thêm

  // EV ô tô – dùng “class” theo dải
  { value: 'ev400', label: 'EV 400V class (≈ 300–450V)' },
  { value: 'ev800', label: 'EV 800V class (≈ 650–950V)' },
  { value: 'other', label: 'Khác' }
]

export const BATTERY_HEALTH_OPTIONS = [
  { value: 'excellent', label: 'Xuất sắc (90-100%)' },
  { value: 'good', label: 'Tốt (70-89%)' },
  { value: 'fair', label: 'Khá (50-69%)' },
  { value: 'poor', label: 'Yếu (<50%)' }
]

export const WARRANTY_OPTIONS = [
  { value: '6', label: '< 6 tháng' },
  { value: '12', label: '< 12 tháng' },
  { value: '24', label: '< 24 tháng' },
  { value: '36', label: '< 36 tháng' },
  { value: 'none', label: 'Không bảo hành' }
]
