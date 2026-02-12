'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollStackProps {
  children: ReactNode
}

interface ScrollStackItemProps {
  children: ReactNode
  index?: number
}

// Simplified ScrollStack logic relying on sticky positioning
export function ScrollStackItem({ children, index = 0 }: ScrollStackItemProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleScroll = () => {
      const rect = card.getBoundingClientRect()
      // Distance from top of viewport
      const top = rect.top 
      const windowHeight = window.innerHeight
      
      // Calculate a value that goes from 0 to 1 as the card moves up the viewport
      // We want the effect to happen when the card is sticking at the top (around 8rem)
      // but actually, we want the *next* cards covering it to cause it to scale down.
      // So we check how far *down* it is being pushed? No.
      
      // Stacking effect: Cards stick. As you scroll past, they stay there.
      // Visual flair: The ones *behind* (earlier index) should scale down slightly as new ones come up.
      // Actually, simple sticky is often enough for the "stack" feel.
      // Let's add a subtle scale based on scroll position relative to the viewport.
      
      if (top <= 140) { // 140px approx 8rem + padding
         // It's sticking or passed.
         // In a sticky stack, the element stays at top: 8rem.
         // We can't easily detect "how much scrolled past" just from getBoundingClientRect if it's sticky.
         // Wait, if it's sticky, top remains constant!
         // So getBoundingClientRect().top will stay at ~128px (8rem).
         
         // To animate the ones *underneath*, we need to know the scroll position of the parent container relative to where this item *would* be.
         // This is complex without a ScrollTrigger-like library.
         // HOWEVER, standard sticky behavior + shadow is user's "Scroll Stack".
         // The provided code used `translateZ` and `rotateX`.
         
         // Let's try to just apply the transforms statically or leave them dynamic if we can.
         // For now, let's stick to pure CSS sticky for reliability, and basic transforms.
         
         // Update: The previous implementation failed because of nested scrolling.
         // This new one just renders a div. The styling handles the sticky.
      }
    }

    // window.addEventListener('scroll', handleScroll)
    // return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-stack-card-wrapper transition-all duration-500 ease-out">
       {/* Use a wrapper for spacing if needed, but sticky elements need to be siblings usually for simple stacking? 
           Actually, sticky works within parent. If wrapper has height, sticky stays within wrapper.
           We want them all in one container. 
       */}
      <div 
        ref={cardRef} 
        className="scroll-stack-card sticky top-32 origin-top"
        style={{
            marginBottom: `${(index + 1) * 2}rem`, // Give space for next cards? No, marginBottom pushes next elements down.
            // transform: `scale(${1 - index * 0.05}) translateZ(0)` // Static scale? No.
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function ScrollStack({ children }: ScrollStackProps) {
  return (
    <div className="relative w-full">
      {/* 
        Container must be tall enough? 
        Actually, standard flow works:
        Div
          Sticky Card 1 (height 20rem)
          Sticky Card 2 (height 20rem)
        
        If we want them to overlap, Card 2 must scroll *over* Card 1.
        Sticky elements do exactly that!
        When Card 2 hits the sticking point, it covers Card 1.
      */}
      <div className="space-y-32 pb-40">
        {children}
      </div>
    </div>
  )
}
