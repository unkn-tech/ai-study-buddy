import { motion } from 'framer-motion';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const AnimatedSvgIcon = styled(SvgIcon)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }
`;

export const DashboardCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2E51ED" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path
      fill="url(#dashboardGradient)"
      d="M4 13h6c0.55 0 1-0.45 1-1V4c0-0.55-0.45-1-1-1H4C3.45 3 3 3.45 3 4v8C3 12.55 3.45 13 4 13zM4 21h6c0.55 0 1-0.45 1-1v-4c0-0.55-0.45-1-1-1H4c-0.55 0-1 0.45-1 1v4C3 20.55 3.45 21 4 21zM14 21h6c0.55 0 1-0.45 1-1v-8c0-0.55-0.45-1-1-1h-6c-0.55 0-1 0.45-1 1v8C13 20.55 13.45 21 14 21zM13 4v4c0 0.55 0.45 1 1 1h6c0.55 0 1-0.45 1-1V4c0-0.55-0.45-1-1-1h-6C13.45 3 13 3.45 13 4z"
    />
  </AnimatedSvgIcon>
);

export const StudyCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="studyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8E53" />
      </linearGradient>
    </defs>
    <path
      fill="url(#studyGradient)"
      d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
    />
  </AnimatedSvgIcon>
);

export const FlashcardCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="flashcardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#8BC34A" />
      </linearGradient>
    </defs>
    <path
      fill="url(#flashcardGradient)"
      d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"
    />
  </AnimatedSvgIcon>
);

export const TimerCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#2E51ED" />
      </linearGradient>
    </defs>
    <path
      fill="url(#timerGradient)"
      d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
    />
  </AnimatedSvgIcon>
);

export const NotesCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="notesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F72585" />
        <stop offset="100%" stopColor="#7209B7" />
      </linearGradient>
    </defs>
    <path
      fill="url(#notesGradient)"
      d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
    />
  </AnimatedSvgIcon>
);

export const HistoryCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="historyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CC9F0" />
        <stop offset="100%" stopColor="#4361EE" />
      </linearGradient>
    </defs>
    <path
      fill="url(#historyGradient)"
      d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
    />
  </AnimatedSvgIcon>
);

export const ChatCustomIcon = (props: SvgIconProps) => (
  <AnimatedSvgIcon {...props}>
    <defs>
      <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F5A0" />
        <stop offset="100%" stopColor="#00D9F5" />
      </linearGradient>
    </defs>
    <path
      fill="url(#chatGradient)"
      d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
    />
  </AnimatedSvgIcon>
); 