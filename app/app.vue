<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-green-600 mb-6">
          Công cụ tính lương Gross sang Net và ngược lại [Chuẩn 2025]
        </h1>

        <!-- Regulation Selection -->
        <div class="mb-6">
          <p class="font-medium mb-3">Áp dụng quy định:</p>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="regulation"
                value="2024"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">Từ 01/07/2024 - 30/06/2025</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="regulation"
                value="2025"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">Từ 01/07/2025 (Mới nhất)</span>
            </label>
          </div>
        </div>

        <!-- Info Text -->
        <div class="space-y-2 text-sm text-gray-600 mb-6">
          <p>
            Áp dụng mức lương cơ sở mới nhất có hiệu lực từ ngày 01/07/2024 (Theo Nghị định số 73/2024/NĐ-CP)
          </p>
          <p>
            Áp dụng
            <a href="#" class="text-green-600 underline">mức lương tối thiểu vùng</a>
            mới nhất có hiệu lực từ ngày 01/07/2025 (Theo Nghị định 128/2025/NĐ-CP)
          </p>
          <p>
            Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng (132 triệu đồng/năm) với người nộp thuế và 4,4 triệu
            đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số 954/2020/UBTVQH14)
          </p>
        </div>

        <!-- Summary Info -->
        <div class="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-4 mb-6">
          <div>
            <p class="text-sm text-gray-600 mb-1">Lương cơ sở:</p>
            <p class="text-lg font-semibold text-green-600">2,340,000đ</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Giảm trừ gia cảnh bản thân:</p>
            <p class="text-lg font-semibold text-green-600">11,000,000đ</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Người phụ thuộc:</p>
            <p class="text-lg font-semibold text-green-600">4,400,000đ</p>
          </div>
        </div>

        <!-- Input Forms -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- Thu nhập -->
          <div>
            <label class="block text-sm font-medium mb-2">Thu Nhập:</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">$</span>
              <input
                type="text"
                v-model="income"
                @input="formatNumber"
                class="w-full pl-8 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">(VNĐ)</span>
            </div>
          </div>

          <!-- Số người phụ thuộc -->
          <div>
            <label class="block text-sm font-medium mb-2">Số người phụ thuộc:</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <input
                type="number"
                v-model="dependents"
                min="0"
                class="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">(Người)</span>
            </div>
          </div>
        </div>

        <!-- Mức lương đóng bảo hiểm -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-3">Mức lương đóng bảo hiểm:</label>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="insuranceType"
                value="official"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">Trên lương chính thức</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="insuranceType"
                value="other"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">Khác:</span>
            </label>
            <div v-if="insuranceType === 'other'" class="relative flex-1 max-w-xs">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">$</span>
              <input
                type="text"
                v-model="customInsurance"
                class="w-full pl-8 pr-16 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">(VNĐ)</span>
            </div>
          </div>
        </div>

        <!-- Vùng -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-3">
            Vùng: <span class="text-red-500">(Giải thích)</span>
          </label>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="1"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">I</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="2"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">II</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="3"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">III</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="4"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span class="ml-2 text-gray-700">IV</span>
            </label>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-4">
          <button
            @click="calculateGrossToNet"
            class="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-md"
          >
            GROSS → NET
          </button>
          <button
            @click="calculateNetToGross"
            class="px-8 py-3 bg-white text-green-600 font-semibold rounded-md border-2 border-green-600 hover:bg-green-50 transition-colors shadow-md"
          >
            NET → GROSS
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="showResults" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Kết quả tính toán</h2>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Lương Gross:</span>
            <span class="font-semibold">{{ formatCurrency(results.gross) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Bảo hiểm (10.5%):</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.insurance) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Thu nhập trước thuế:</span>
            <span class="font-semibold">{{ formatCurrency(results.beforeTax) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Giảm trừ gia cảnh:</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.deduction) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Thu nhập tính thuế:</span>
            <span class="font-semibold">{{ formatCurrency(results.taxableIncome) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-gray-600">Thuế TNCN:</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.tax) }}</span>
          </div>
          <div class="flex justify-between py-3 bg-green-50 rounded px-2 mt-2">
            <span class="text-lg font-bold text-gray-800">Lương Net:</span>
            <span class="text-lg font-bold text-green-600">{{ formatCurrency(results.net) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const regulation = ref('2025')
const income = ref('')
const dependents = ref(0)
const insuranceType = ref('official')
const customInsurance = ref('')
const region = ref('1')
const showResults = ref(false)
const results = ref({
  gross: 0,
  insurance: 0,
  beforeTax: 0,
  deduction: 0,
  taxableIncome: 0,
  tax: 0,
  net: 0
})

// Constants
const BASE_DEDUCTION = 11000000 // Giảm trừ gia cảnh bản thân
const DEPENDENT_DEDUCTION = 4400000 // Giảm trừ cho mỗi người phụ thuộc
const INSURANCE_RATE = 0.105 // 10.5% bảo hiểm

// Tax brackets (bậc thuế lũy tiến)
const TAX_BRACKETS = [
  { limit: 5000000, rate: 0.05 },
  { limit: 10000000, rate: 0.10 },
  { limit: 18000000, rate: 0.15 },
  { limit: 32000000, rate: 0.20 },
  { limit: 52000000, rate: 0.25 },
  { limit: 80000000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 }
]

// Format number input
const formatNumber = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '')
  income.value = value
}

// Calculate tax based on progressive tax brackets
const calculateTax = (taxableIncome) => {
  if (taxableIncome <= 0) return 0
  
  let tax = 0
  let remaining = taxableIncome
  let previousLimit = 0
  
  for (const bracket of TAX_BRACKETS) {
    const bracketSize = bracket.limit - previousLimit
    const taxableInBracket = Math.min(remaining, bracketSize)
    
    if (taxableInBracket <= 0) break
    
    tax += taxableInBracket * bracket.rate
    remaining -= taxableInBracket
    previousLimit = bracket.limit
    
    if (remaining <= 0) break
  }
  
  return Math.round(tax)
}

// Calculate Gross to Net
const calculateGrossToNet = () => {
  const gross = parseFloat(income.value) || 0
  if (gross === 0) {
    alert('Vui lòng nhập thu nhập')
    return
  }
  
  // Calculate insurance
  const insuranceBase = insuranceType.value === 'official' ? gross : (parseFloat(customInsurance.value) || gross)
  const insurance = Math.round(insuranceBase * INSURANCE_RATE)
  
  // Calculate income before tax
  const beforeTax = gross - insurance
  
  // Calculate total deduction
  const totalDeduction = BASE_DEDUCTION + (dependents.value * DEPENDENT_DEDUCTION)
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, beforeTax - totalDeduction)
  
  // Calculate tax
  const tax = calculateTax(taxableIncome)
  
  // Calculate net income
  const net = gross - insurance - tax
  
  results.value = {
    gross,
    insurance,
    beforeTax,
    deduction: totalDeduction,
    taxableIncome,
    tax,
    net
  }
  
  showResults.value = true
}

// Calculate Net to Gross (approximate)
const calculateNetToGross = () => {
  const targetNet = parseFloat(income.value) || 0
  if (targetNet === 0) {
    alert('Vui lòng nhập thu nhập net mong muốn')
    return
  }
  
  // Use iterative approach to find gross
  let gross = targetNet * 1.3 // Initial estimate
  let iteration = 0
  const maxIterations = 100
  
  while (iteration < maxIterations) {
    const insuranceBase = insuranceType.value === 'official' ? gross : (parseFloat(customInsurance.value) || gross)
    const insurance = insuranceBase * INSURANCE_RATE
    const beforeTax = gross - insurance
    const totalDeduction = BASE_DEDUCTION + (dependents.value * DEPENDENT_DEDUCTION)
    const taxableIncome = Math.max(0, beforeTax - totalDeduction)
    const tax = calculateTax(taxableIncome)
    const calculatedNet = gross - insurance - tax
    
    const difference = targetNet - calculatedNet
    
    if (Math.abs(difference) < 1000) {
      // Close enough
      results.value = {
        gross: Math.round(gross),
        insurance: Math.round(insurance),
        beforeTax: Math.round(beforeTax),
        deduction: totalDeduction,
        taxableIncome: Math.round(taxableIncome),
        tax: Math.round(tax),
        net: Math.round(calculatedNet)
      }
      showResults.value = true
      return
    }
    
    // Adjust gross
    gross += difference * 0.5
    iteration++
  }
  
  alert('Không thể tính toán chính xác. Vui lòng thử lại với giá trị khác.')
}

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}
</script>

<style scoped>
input[type="radio"] {
  cursor: pointer;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
