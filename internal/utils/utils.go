package utils

func ShippingRateCalc(baseFee int, premiumPercentage int, units int) float64 {
	return float64(baseFee*units) * (1 + float64(premiumPercentage)/10000)
}
