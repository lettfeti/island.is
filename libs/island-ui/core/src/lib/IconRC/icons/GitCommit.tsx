import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgGitCommit = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="git-commit_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M448 224h-68a128 128 0 00-247.9 0H64a32 32 0 000 64h68.05A128 128 0 00380 288h68a32 32 0 000-64zm-192 96a64 64 0 1164-64 64.07 64.07 0 01-64 64z" />
    </svg>
  )
}

export default SvgGitCommit