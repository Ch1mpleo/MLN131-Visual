import React, { useRef, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';

interface MenuItemData {
  link?: string;
  text: string;
  year?: string;
  subtext?: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  activeIndex?: number | null;
  onItemClick?: (index: number) => void;
  rowHeight?: number;
  renderExpanded?: (index: number) => ReactNode;
}

interface MenuItemProps extends MenuItemData {
  index: number;
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  isActive: boolean;
  rowHeight: number;
  onItemClick?: (index: number) => void;
  panelId?: string;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  activeIndex = null,
  onItemClick,
  rowHeight = 76,
  renderExpanded,
}) => {
  const isExpandable = Boolean(renderExpanded && onItemClick);

  return (
    <div
      className={`w-full ${isExpandable ? '' : 'h-full overflow-hidden'}`}
      style={{ backgroundColor: bgColor }}
    >
      <nav
        className={`flex flex-col m-0 p-0 ${isExpandable ? '' : 'h-full'}`}
        aria-label="Menu lịch sử dân chủ"
      >
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const panelId = `flowing-menu-panel-${idx}`;

          return (
            <div key={idx} className="flex shrink-0 flex-col">
              <MenuItem
                {...item}
                index={idx}
                speed={speed}
                textColor={textColor}
                marqueeBgColor={marqueeBgColor}
                marqueeTextColor={marqueeTextColor}
                borderColor={borderColor}
                isFirst={idx === 0}
                isActive={isActive}
                rowHeight={rowHeight}
                onItemClick={onItemClick}
                panelId={isExpandable ? panelId : undefined}
              />

              {isExpandable && (
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={`Chi tiết ${item.text}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.42, ease: [0.33, 1, 0.68, 1] },
                        opacity: { duration: 0.28, ease: 'easeOut' },
                      }}
                      className="overflow-hidden"
                      style={{ borderTop: `1px solid ${borderColor}` }}
                    >
                      <div className="bg-bone grain border-x-0 border-b-0 border-t-0 border-ink shadow-[inset_4px_0_0_#D32F2F]">
                        {renderExpanded!(idx)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  year,
  subtext,
  image,
  index,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  isActive,
  rowHeight,
  onItemClick,
  panelId,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image, subtext, year]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleClick = () => {
    onItemClick?.(index);
  };

  const triggerClassName =
    'flex h-full w-full flex-col items-center justify-center relative cursor-pointer uppercase no-underline font-semibold px-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D32F2F]';

  const triggerStyle = { color: textColor };

  const label = (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <span className="font-headline text-[clamp(0.85rem,2.6vh,1.25rem)] leading-tight tracking-wide">
          {text}
        </span>
        {year && (
          <span className="font-mono text-[clamp(0.55rem,1.35vh,0.7rem)] normal-case tracking-[0.16em] text-[#D32F2F]">
            {year}
          </span>
        )}
      </div>
      {subtext && (
        <span className="mt-1 font-mono text-[clamp(0.55rem,1.4vh,0.7rem)] normal-case tracking-[0.18em] opacity-75">
          {subtext}
        </span>
      )}
    </>
  );

  const marqueeLabel = [text, year, subtext].filter(Boolean).join(' · ');

  return (
    <div
      className="relative shrink-0 overflow-hidden text-center"
      ref={itemRef}
      style={{
        height: rowHeight,
        borderTop: isFirst ? 'none' : `1px solid ${borderColor}`,
        backgroundColor: isActive ? 'rgba(211, 47, 47, 0.22)' : undefined,
        boxShadow: isActive ? 'inset 4px 0 0 #D32F2F' : undefined,
      }}
    >
      {onItemClick ? (
        <button
          type="button"
          className={triggerClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-expanded={isActive}
          aria-controls={panelId}
          style={triggerStyle}
        >
          {label}
        </button>
      ) : (
        <a
          className={triggerClassName}
          href={link ?? '#'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={triggerStyle}
        >
          {label}
        </a>
      )}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
              <span className="whitespace-nowrap uppercase font-normal text-[4vh] leading-[1] px-[1vw]">
                {marqueeLabel}
              </span>
              <div
                className="w-[200px] h-[7vh] my-[2em] mx-[2vw] py-[1em] rounded-[50px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
