<template>
  <div class="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <h1 class="text-lg sm:text-2xl font-bold text-green-600 mb-4 sm:mb-6 leading-tight">
          Công cụ tính lương Gross sang Net và ngược lại [Chuẩn cơm mẹ nấu]
        </h1>

        <!-- Regulation Selection -->
        <div class="mb-4 sm:mb-6">
          <p class="font-medium mb-3 text-sm sm:text-base">Áp dụng quy định:</p>
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="regulation"
                value="2025"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">Từ 01/07/2025 - 31/12/2025</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="regulation"
                value="2026"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 font-semibold text-green-600 text-sm sm:text-base">Từ 01/01/2026 (Mới nhất)</span>
            </label>
          </div>
        </div>

        <!-- Info Text -->
        <div class="space-y-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <p v-if="regulation === '2025'">
            Áp dụng
            <a href="#" class="text-green-600 underline">mức lương tối thiểu vùng</a>
            mới nhất có hiệu lực từ ngày 01/07/2025 (Theo Nghị định 128/2025/NĐ-CP)
          </p>
          <p v-if="regulation === '2025'">
            Áp dụng mức giảm trừ gia cảnh 11 triệu đồng/tháng (132 triệu đồng/năm) với người nộp thuế và 4,4 triệu
            đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số 954/2020/UBTVQH14)
          </p>
          <p v-if="regulation === '2026'" class="font-semibold text-green-700">
            Áp dụng mức giảm trừ gia cảnh 15,5 triệu đồng/tháng (186 triệu đồng/năm) với người nộp thuế và 6,2 triệu
            đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số 110/2025/UBTVQH15)
          </p>
          <p v-if="regulation === '2026'">
            Áp dụng mức giảm trừ gia cảnh mới nhất có hiệu lực từ ngày 01/01/2026 (Tăng 40,91% so với mức hiện hành)
          </p>
        </div>

        <!-- Summary Info -->
        <div class="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div class="grid grid-cols-3 gap-2 sm:gap-4">
            <div class="text-center">
              <p class="text-[10px] sm:text-sm text-gray-600 mb-1 leading-tight">Lương cơ sở:</p>
              <p class="text-sm sm:text-lg font-semibold text-green-600">{{ formatCurrency(baseSalary) }}</p>
            </div>
            <div class="text-center">
              <p class="text-[10px] sm:text-sm text-gray-600 mb-1 leading-tight">Giảm trừ gia cảnh bản thân:</p>
              <p class="text-sm sm:text-lg font-semibold text-green-600">{{ formatCurrency(baseDeduction) }}</p>
            </div>
            <div class="text-center">
              <p class="text-[10px] sm:text-sm text-gray-600 mb-1 leading-tight">Người phụ thuộc:</p>
              <p class="text-sm sm:text-lg font-semibold text-green-600">{{ formatCurrency(dependentDeduction) }}</p>
            </div>
          </div>
        </div>

        <!-- Input Forms -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <!-- Thu nhập -->
          <div>
            <label class="block text-sm font-medium mb-2">Thu Nhập:</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-sm">$</span>
              <input
                type="text"
                v-model="formattedIncome"
                @input="handleIncomeInput"
                @focus="handleFocus"
                class="w-full pl-8 pr-16 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">(VNĐ)</span>
            </div>
          </div>

          <!-- Số người phụ thuộc -->
          <div>
            <label class="block text-sm font-medium mb-2">Số người phụ thuộc:</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <input
                type="number"
                v-model="dependents"
                min="0"
                class="w-full pl-10 pr-20 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">(Người)</span>
            </div>
          </div>
        </div>

        <!-- Phụ cấp tiền ăn miễn thuế -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-sm font-medium mb-2">
            Phụ cấp tiền ăn miễn thuế:
            <span class="text-xs text-gray-500 font-normal">(Khoản này được trừ vào thu nhập tính thuế)</span>
          </label>
          <div class="relative max-w-md">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-sm">$</span>
            <input
              type="text"
              v-model="formattedMealAllowance"
              @input="handleMealAllowanceInput"
              @focus="handleFocus"
              class="w-full pl-8 pr-16 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="730.000"
            />
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">(VNĐ)</span>
          </div>
        </div>

        <!-- Mức phí công đoàn -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-xs sm:text-sm font-medium mb-3">Mức phí công đoàn:</label>
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="unionFeeRate"
                value="old"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">Trước 1/7/2025 (1%)</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="unionFeeRate"
                value="new"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base font-semibold text-green-600">Từ 1/7/2025 (0.5%)</span>
            </label>
          </div>
        </div>

        <!-- Mức lương đóng bảo hiểm -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-xs sm:text-sm font-medium mb-3">Mức lương đóng bảo hiểm:</label>
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="insuranceType"
                value="official"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">Trên lương chính thức</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="insuranceType"
                value="other"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">Khác:</span>
            </label>
            <div v-if="insuranceType === 'other'" class="relative w-full sm:flex-1 sm:max-w-xs mt-2 sm:mt-0">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-sm">$</span>
              <input
                type="text"
                v-model="formattedCustomInsurance"
                @input="handleCustomInsuranceInput"
                @focus="handleFocus"
                class="w-full pl-8 pr-16 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">(VNĐ)</span>
            </div>
          </div>
        </div>

        <!-- Vùng -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-xs sm:text-sm font-medium mb-3">
            Vùng: <span class="text-red-500 text-xs">(Giải thích)</span>
          </label>
          <div class="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="1"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">I</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="2"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">II</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="3"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">III</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="region"
                value="4"
                class="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
              />
              <span class="ml-2 text-gray-700 text-sm sm:text-base">IV</span>
            </label>
          </div>
        </div>

        <!-- Comparison Toggle -->
        <div class="mb-4 sm:mb-6">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="showComparison"
              class="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
            />
            <span class="ml-2 text-sm sm:text-base text-gray-700">
              So sánh chênh lệch giữa 2025 và 2026
              <span class="text-xs text-gray-500">(Xem tác động của quy định mới)</span>
            </span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            @click="calculateGrossToNet"
            class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-md text-sm sm:text-base"
          >
            GROSS → NET
          </button>
          <button
            @click="calculateNetToGross"
            class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-green-600 font-semibold rounded-md border-2 border-green-600 hover:bg-green-50 transition-colors shadow-md text-sm sm:text-base"
          >
            NET → GROSS
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="showResults" class="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">Kết quả tính toán</h2>
        <div class="space-y-2 sm:space-y-3">
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Lương Gross:</span>
            <span class="font-semibold">{{ formatCurrency(results.gross) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Bảo hiểm (10.5%):</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.insurance) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Phí công đoàn ({{ unionFeeRate === 'new' ? '0.5%' : '1%' }}):</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.unionFee) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Thu nhập trước thuế:</span>
            <span class="font-semibold">{{ formatCurrency(results.beforeTax) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Giảm trừ gia cảnh:</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.deduction) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Phụ cấp tiền ăn (miễn thuế):</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.mealAllowance) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Thu nhập tính thuế:</span>
            <span class="font-semibold">{{ formatCurrency(results.taxableIncome) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b text-sm sm:text-base">
            <span class="text-gray-600">Thuế TNCN:</span>
            <span class="font-semibold text-red-600">-{{ formatCurrency(results.tax) }}</span>
          </div>
          <div class="flex justify-between py-3 bg-green-50 rounded px-2 mt-2">
            <span class="text-base sm:text-lg font-bold text-gray-800">Lương Net:</span>
            <span class="text-base sm:text-lg font-bold text-green-600">{{ formatCurrency(results.net) }}</span>
          </div>
        </div>
      </div>

      <!-- Comparison Section -->
      <div v-if="showResults && showComparison && comparisonResults.results2025 && comparisonResults.results2026" class="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          So sánh quy định 2025 vs 2026
          <span class="text-sm font-normal text-gray-600">(Cùng mức lương Gross)</span>
        </h2>
        
        <!-- Comparison Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 border-gray-300">
                <th class="text-left py-3 px-2">Hạng mục</th>
                <th class="text-right py-3 px-2">2025</th>
                <th class="text-right py-3 px-2">2026</th>
                <th class="text-right py-3 px-2 text-green-600">Chênh lệch</th>
              </tr>
            </thead>
            <tbody class="text-xs sm:text-sm">
              <tr class="border-b">
                <td class="py-2 px-2 text-gray-600">Giảm trừ gia cảnh</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2025.deduction) }}</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2026.deduction) }}</td>
                <td class="py-2 px-2 text-right font-semibold text-green-600">
                  +{{ formatCurrency(comparisonResults.results2026.deduction - comparisonResults.results2025.deduction) }}
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2 px-2 text-gray-600">Thu nhập tính thuế</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2025.taxableIncome) }}</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2026.taxableIncome) }}</td>
                <td class="py-2 px-2 text-right font-semibold" :class="comparisonResults.results2026.taxableIncome < comparisonResults.results2025.taxableIncome ? 'text-green-600' : 'text-red-600'">
                  {{ comparisonResults.results2026.taxableIncome - comparisonResults.results2025.taxableIncome >= 0 ? '+' : '' }}{{ formatCurrency(comparisonResults.results2026.taxableIncome - comparisonResults.results2025.taxableIncome) }}
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2 px-2 text-gray-600">Thuế TNCN</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2025.tax) }}</td>
                <td class="py-2 px-2 text-right">{{ formatCurrency(comparisonResults.results2026.tax) }}</td>
                <td class="py-2 px-2 text-right font-semibold" :class="comparisonResults.results2026.tax < comparisonResults.results2025.tax ? 'text-green-600' : 'text-red-600'">
                  {{ comparisonResults.results2026.tax - comparisonResults.results2025.tax >= 0 ? '+' : '' }}{{ formatCurrency(comparisonResults.results2026.tax - comparisonResults.results2025.tax) }}
                </td>
              </tr>
              <tr class="border-b-2 border-gray-300 bg-green-50">
                <td class="py-3 px-2 font-bold text-gray-800">Lương Net</td>
                <td class="py-3 px-2 text-right font-bold">{{ formatCurrency(comparisonResults.results2025.net) }}</td>
                <td class="py-3 px-2 text-right font-bold">{{ formatCurrency(comparisonResults.results2026.net) }}</td>
                <td class="py-3 px-2 text-right font-bold text-green-600">
                  +{{ formatCurrency(comparisonResults.results2026.net - comparisonResults.results2025.net) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary -->
        <div class="mt-4 p-4 bg-green-50 rounded-lg">
          <p class="text-sm sm:text-base text-gray-700">
            <span class="font-semibold text-green-600">Kết luận:</span>
            Với cùng mức lương Gross, áp dụng quy định mới từ 01/01/2026, bạn sẽ nhận được 
            <span class="font-bold text-green-600">{{ formatCurrency(comparisonResults.results2026.net - comparisonResults.results2025.net) }}</span>
            nhiều hơn mỗi tháng nhờ mức giảm trừ gia cảnh tăng lên.
            <span class="text-xs block mt-2 text-gray-600">
              (Tương đương tăng {{ ((comparisonResults.results2026.net - comparisonResults.results2025.net) / comparisonResults.results2025.net * 100).toFixed(2) }}% lương Net)
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// State
const regulation = ref('2026')
const income = ref('')
const formattedIncome = ref('')
const dependents = ref(0)
const mealAllowance = ref('730000') // Phụ cấp tiền ăn miễn thuế
const formattedMealAllowance = ref('730.000')
const unionFeeRate = ref('new') // Mặc định là mức mới từ 1/7/2025
const insuranceType = ref('official')
const customInsurance = ref('')
const formattedCustomInsurance = ref('')
const region = ref('1')
const showResults = ref(false)
const showComparison = ref(false)
const results = ref({
  gross: 0,
  insurance: 0,
  unionFee: 0,
  beforeTax: 0,
  deduction: 0,
  mealAllowance: 0,
  taxableIncome: 0,
  tax: 0,
  net: 0
})
const comparisonResults = ref({
  results2025: null,
  results2026: null
})

// Constants
const BASE_SALARY = 2340000 // Lương cơ sở
const INSURANCE_RATE = 0.105 // 10.5% bảo hiểm
const UNION_FEE_RATES = {
  old: 0.01,  // 1% trước 1/7/2025
  new: 0.005  // 0.5% từ 1/7/2025
}

// Deduction rates based on regulation
const DEDUCTION_RATES = {
  '2025': {
    base: 11000000,
    dependent: 4400000
  },
  '2026': {
    base: 15500000,
    dependent: 6200000
  }
}

// Computed properties for current deductions
const baseSalary = computed(() => BASE_SALARY)
const baseDeduction = computed(() => DEDUCTION_RATES[regulation.value].base)
const dependentDeduction = computed(() => DEDUCTION_RATES[regulation.value].dependent)
const currentUnionFeeRate = computed(() => UNION_FEE_RATES[unionFeeRate.value])

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

// Format number with thousands separator
const formatNumberWithSeparator = (num) => {
  if (!num) return ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Handle income input with mask
const handleIncomeInput = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '')
  income.value = value
  formattedIncome.value = formatNumberWithSeparator(value)
}

// Handle custom insurance input with mask
const handleCustomInsuranceInput = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '')
  customInsurance.value = value
  formattedCustomInsurance.value = formatNumberWithSeparator(value)
}

// Handle meal allowance input with mask
const handleMealAllowanceInput = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '')
  mealAllowance.value = value
  formattedMealAllowance.value = formatNumberWithSeparator(value)
}

// Handle focus to select all
const handleFocus = (event) => {
  event.target.select()
}

// Auto-fill custom insurance with income when switching to 'other'
watch(insuranceType, (newValue, oldValue) => {
  if (newValue === 'other' && income.value) {
    // Auto-fill with current income value
    customInsurance.value = income.value
    formattedCustomInsurance.value = formatNumberWithSeparator(income.value)
  }
})

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

// Helper function to calculate result for a specific regulation
const calculateForRegulation = (gross, regulationYear) => {
  const insuranceBase = insuranceType.value === 'official' ? gross : (parseFloat(customInsurance.value) || gross)
  const insurance = Math.round(insuranceBase * INSURANCE_RATE)
  
  const unionFee = Math.round(Math.min(
    insuranceBase * currentUnionFeeRate.value,
    BASE_SALARY * 0.1
  ))
  
  const beforeTax = gross - insurance - unionFee
  const mealAllowanceAmount = parseFloat(mealAllowance.value) || 0
  const taxableBase = gross - mealAllowanceAmount
  
  // Get deduction for specific regulation
  const deductionRates = DEDUCTION_RATES[regulationYear]
  const totalDeduction = deductionRates.base + (dependents.value * deductionRates.dependent)
  
  const taxableIncome = Math.max(0, taxableBase - insurance - totalDeduction)
  const tax = calculateTax(taxableIncome)
  const net = gross - insurance - unionFee - tax
  
  return {
    gross,
    insurance,
    unionFee,
    beforeTax,
    deduction: totalDeduction,
    mealAllowance: mealAllowanceAmount,
    taxableIncome,
    tax,
    net
  }
}

// Calculate Gross to Net
const calculateGrossToNet = () => {
  const gross = parseFloat(income.value) || 0
  if (gross === 0) {
    alert('Vui lòng nhập thu nhập')
    return
  }
  
  // Calculate for current regulation
  results.value = calculateForRegulation(gross, regulation.value)
  
  // Calculate comparison if enabled
  if (showComparison.value) {
    comparisonResults.value = {
      results2025: calculateForRegulation(gross, '2025'),
      results2026: calculateForRegulation(gross, '2026')
    }
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
  
  // Get current deduction rates
  const currentBaseDeduction = baseDeduction.value
  const currentDependentDeduction = dependentDeduction.value
  const totalDeduction = currentBaseDeduction + (dependents.value * currentDependentDeduction)
  const mealAllowanceAmount = parseFloat(mealAllowance.value) || 0
  
  // Helper function to calculate net from gross
  const calculateNetFromGross = (gross) => {
    const insuranceBase = insuranceType.value === 'official' ? gross : (parseFloat(customInsurance.value) || gross)
    const insurance = insuranceBase * INSURANCE_RATE
    const unionFee = Math.min(
      insuranceBase * currentUnionFeeRate.value,
      BASE_SALARY * 0.1
    )
    
    // Thu nhập chịu thuế = Tổng lương - tiền ăn không tính thuế
    const taxableBase = gross - mealAllowanceAmount
    
    // Thu nhập tính thuế = Thu nhập chịu thuế - Bảo hiểm - Giảm trừ (Công đoàn phí KHÔNG trừ)
    const taxableIncome = Math.max(0, taxableBase - insurance - totalDeduction)
    
    const tax = calculateTax(taxableIncome)
    const net = gross - insurance - unionFee - tax
    
    return {
      net,
      insurance,
      unionFee,
      taxableIncome,
      tax,
      beforeTax: gross - insurance - unionFee
    }
  }
  
  // Use binary search combined with Newton's method for better convergence
  let minGross = targetNet
  let maxGross = targetNet * 3 // Wider range for safety
  let gross = targetNet * 1.35 // Better initial estimate
  let iteration = 0
  const maxIterations = 150
  const tolerance = 50 // Very tight tolerance
  
  while (iteration < maxIterations) {
    const result = calculateNetFromGross(gross)
    const difference = targetNet - result.net
    
    if (Math.abs(difference) < tolerance) {
      // Found accurate solution
      const finalGross = Math.round(gross)
      results.value = {
        gross: finalGross,
        insurance: Math.round(result.insurance),
        unionFee: Math.round(result.unionFee),
        beforeTax: Math.round(result.beforeTax),
        deduction: totalDeduction,
        mealAllowance: mealAllowanceAmount,
        taxableIncome: Math.round(result.taxableIncome),
        tax: Math.round(result.tax),
        net: Math.round(result.net)
      }
      
      // Calculate comparison if enabled
      if (showComparison.value) {
        comparisonResults.value = {
          results2025: calculateForRegulation(finalGross, '2025'),
          results2026: calculateForRegulation(finalGross, '2026')
        }
      }
      
      showResults.value = true
      return
    }
    
    // Adjust search range and gross
    if (result.net < targetNet) {
      // Need higher gross
      minGross = gross
    } else {
      // Need lower gross
      maxGross = gross
    }
    
    // Use aggressive Newton-like adjustment for first iterations, then switch to binary search
    if (iteration < 20 && maxGross - minGross > 10000) {
      // Calculate marginal rate (how much net changes per gross change)
      const testGross = gross + 1000
      const testResult = calculateNetFromGross(testGross)
      const marginalRate = (testResult.net - result.net) / 1000
      
      if (marginalRate > 0.3) { // Reasonable marginal rate
        gross += difference / marginalRate
      } else {
        gross = (minGross + maxGross) / 2
      }
    } else {
      // Binary search for stability
      gross = (minGross + maxGross) / 2
    }
    
    // Keep within bounds
    gross = Math.max(minGross, Math.min(maxGross, gross))
    
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
