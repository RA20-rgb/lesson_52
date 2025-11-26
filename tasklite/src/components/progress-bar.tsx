// src/components/progress-bar.tsx
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type ProgressBarProps = {
  percent: number;
};

const Wrapper = styled.div`
  margin: ${(p) => p.theme.spacing(2)} 0;
  text-align: center;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing(1)};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.textMuted};
`;

const BarBackground = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(p) => p.percent}%;
  background: linear-gradient(
    90deg,
    ${(p) => p.theme.colors.accent},
    ${(p) => p.theme.colors.accentHover}
  );
  transition: width 0.6s ease;
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const PercentText = styled.span`
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.colors.accent};
`;

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <Wrapper>
      <ProgressInfo>
        <span>Прогресс выполнения</span>
        <PercentText>{percent}%</PercentText>
      </ProgressInfo>
      <BarBackground>
        <BarFill percent={percent} />
      </BarBackground>
    </Wrapper>
  );
};