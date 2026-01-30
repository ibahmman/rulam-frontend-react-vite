import dayjs from "dayjs";

export const getCycleInfo = (lastPeriodAt) => {
  if (!lastPeriodAt) return null;

  const today = dayjs();
  const lastPeriod = dayjs(lastPeriodAt);

  const dayDiff = today.diff(lastPeriod, "day") + 1;
  const cycleDay = ((dayDiff - 1) % 28) + 1;

  let phase = "";
  let advice = "";

  if (cycleDay <= 5) {
    phase = "پریود";
    advice = "استراحت، نوشیدن مایعات گرم";
  } else if (cycleDay <= 13) {
    phase = "فولیکولار";
    advice = "انرژی رو به افزایشه 🌱";
  } else if (cycleDay <= 15) {
    phase = "تخمک‌گذاری";
    advice = "تمرکز و انرژی بالا ✨";
  } else {
    phase = "لوتئال";
    advice = "خواب کافی و کاهش استرس 😴";
  }

  return {
    cycleDay,
    phase,
    advice,
  };
};