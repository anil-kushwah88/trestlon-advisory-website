import useInView from './useInView';

/**
 * Wrap any block of content to fade/slide it in when it scrolls into view.
 * variant: 'up' (default) | 'left' | 'right' | 'scale'
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  style: extraStyle = {},
  ...rest
}) {
  const [ref, visible] = useInView({ threshold, once });

  const base =
    variant === 'left' ? 'reveal reveal-left' :
    variant === 'right' ? 'reveal reveal-right' :
    variant === 'scale' ? 'reveal reveal-scale' :
                           'reveal';

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, ...extraStyle }}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
