// KAVIAR ELITE MOTORISTA - LÓGICA DE NEGÓCIOS CENTRALIZADA
// A lógica complexa de comissões, repasses e bônus é executada no backend para segurança.

// Variáveis de Configuração Global (Devem vir do DB em um sistema real, mas estão mockadas aqui)
const CONFIG = {
  // A) Comissão por Nível (Taxa KAVIAR em Corridas Ponto-a-Ponto)
  COMMISSION: {
    Bronze: 0.20,
    Ouro: 0.15,
    Platina: 0.12,
    Diamante: 0.08,
  },
  // D) Ganhos de Tours (Tarifa Base = R$ 100/h)
  TOUR_RATES: {
    HOURLY_BASE: 100.00, // R$ 100/h Tarifa Cliente
    REPASS_BASE: 0.70,   // 70% repasse Ouro/Platina
    REPASS_DIAMANTE_EXTRA: 0.10, // +10% extra para Diamante
  },
  // E) Bônus Turísticos (Valores de Bônus por Ponto, mockado)
  TOUR_POINTS_BONUS: {
    'Cristo Redentor': 20.00,
    'Pão de Açúcar': 15.00,
    'Jardim Botânico': 10.00,
    'Museu do Amanhã': 10.00,
    'Escadaria Selarón': 10.00,
    'DEFAULT': 10.00 
  },
  // D) Bônus Hotéis (Valores de Bônus por Estrela, mockado)
  HOTEL_BONUS_CONFIG: {
    4: 10.00,
    5: 20.00,
    6: 40.00 // Premium
  }
};

// Mapeamento de Fator de Bônus por Nível
const BONUS_FACTOR = {
    Bronze: 0.00,
    Ouro: 0.60,
    Platina: 0.80,
    Diamante: 1.00
};

/**
 * Calcula os ganhos líquidos e os bônus de uma transação.
 * Esta função incorpora toda a lógica financeira do KAVIAR Elite Motorista.
 * @param {object} ride - Detalhes da corrida/tour.
 * @param {string} driverLevel - Nível atual do motorista ('Bronze', 'Ouro', 'Platina', 'Diamante').
 * @returns {object} - Objeto detalhado com os ganhos calculados.
 */
function calculateRideEarnings(ride, driverLevel) {
    const commissionRate = CONFIG.COMMISSION[driverLevel] || CONFIG.COMMISSION.Bronze;
    const baseAmount = ride.base_amount;
    let totalBonus = 0;
    let platformCommission = 0;
    let driverNetEarningsFromTariff = 0;
    const bonusFactor = BONUS_FACTOR[driverLevel];
    
    // Simulação da Corrida que fizemos: Tour de 6 horas, R$ 600,00
    const tourHours = ride.tour_hours || 0; 
    
    if (tourHours > 0) {
      
      // 1. Cálculo da Tarifa Horária Premium (Tour)
      const repassRate = driverLevel === 'Diamante' 
        ? CONFIG.TOUR_RATES.REPASS_BASE + CONFIG.TOUR_RATES.REPASS_DIAMANTE_EXTRA
        : CONFIG.TOUR_RATES.REPASS_BASE;
      
      driverNetEarningsFromTariff = tourHours * CONFIG.TOUR_RATES.HOURLY_BASE * repassRate;
      
      // 2. O que a KAVIAR retém (diferença entre o pago e o repassado)
      platformCommission = baseAmount - driverNetEarningsFromTariff;
      
      // 3. Bônus D (Hotéis)
      const baseHotelBonus = CONFIG.HOTEL_BONUS_CONFIG[ride.hotel_stars] || 0;
      const finalHotelBonus = baseHotelBonus * bonusFactor;
      totalBonus += finalHotelBonus;

      // 4. Bônus E (Turísticos)
      const tourPoints = Array.isArray(ride.tour_points) ? ride.tour_points : [];
      const basePointsBonus = tourPoints.reduce((sum, pointName) => {
          const pointValue = CONFIG.TOUR_POINTS_BONUS[pointName] || CONFIG.TOUR_POINTS_BONUS.DEFAULT;
          return sum + pointValue;
      }, 0);
      
      const finalPointsBonus = basePointsBonus * bonusFactor;
      totalBonus += finalPointsBonus;
      
      // 5. Bônus F (Premium Extra para Diamante - Embutido no repassRate)
      const tourHourlyPremium = driverLevel === 'Diamante' 
        ? (tourHours * CONFIG.TOUR_RATES.HOURLY_BASE * CONFIG.TOUR_RATES.REPASS_DIAMANTE_EXTRA) 
        : 0;
      
      const finalEarnings = driverNetEarningsFromTariff + totalBonus;
      
      return {
          commissionRate, 
          platformCommission,
          driverNetEarnings: finalEarnings,
          hotelBonus: finalHotelBonus,
          tourPointsBonus: finalPointsBonus,
          tourHourlyPremium,
          totalBonus,
      };

    } else {
        // Corrida Ponto-a-Ponto Comum
        const repassRate = 1 - commissionRate;
        const driverNetEarnings = baseAmount * repassRate;
        platformCommission = baseAmount * commissionRate;
        
        return {
            commissionRate,
            platformCommission,
            driverNetEarnings,
            hotelBonus: 0,
            tourPointsBonus: 0,
            tourHourlyPremium: 0,
            totalBonus: 0,
        };
    }
}

module.exports = {
    calculateRideEarnings,
};
