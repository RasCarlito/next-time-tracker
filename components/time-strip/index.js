import { Component } from 'react'
import { observer } from 'mobx-react'
import { forEach, range, partial, isFunction } from 'lodash'
import { setHours, startOfDay } from 'date-fns'
import classnames from 'classnames'

import { differenceInDecimalHours } from 'utils/date'

const oneHourInPercent = 100 / 14

@observer
class TimeStrip extends Component {
  render () {
    return (
      <div className='time-strip-component' title='Click pour ajouter une période' onClick={this.add}>
        {this.scaleBlocks()}
        {this.workBlocks()}
        <style jsx>{`
          .time-strip-component {
            cursor: copy;

            .columns:last-child {
              margin-bottom: 0.75rem;
            }
          }
        `}</style>
      </div>
    )
  }

  workBlocks () {
    const { date, entries } = this.props

    const startOfStrip = setHours(startOfDay(date), 6)
    const blocks = []

    forEach(entries, (entry) => {
      let { start, end } = entry

      if (!entry.end) end = new Date()

      const left = oneHourInPercent * differenceInDecimalHours(start, startOfStrip)
      const width = (oneHourInPercent * differenceInDecimalHours(end, startOfStrip)) - left

      blocks.push({ left, width, entry })
    })

    return (
      <div className='columns work'>
        {blocks.map(this.workBlock)}
        <style jsx>{`
          .work {
            position: relative;
            height: 1rem;
            margin-top: -0.5rem;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }

  workBlock = (block) => {
    const left = `${block.left}%`
    const width = `${block.width}%`

    const ongoing = !block.entry.end

    const classes = classnames('column', 'worked', { ongoing })
    const title = ongoing
      ? 'Période en cours'
      : 'Click pour modifier cette période'

    return (
      <div
        key={block.entry.id}
        className={classes}
        data-type='worked'
        style={{ left, width }}
        title={title}
        onClick={partial(this.edit, block.entry)}
      >
        <style jsx>{`
          .worked {
            position: absolute;
            top: 0;
            background: green;
            flex-grow: unset;
            flex-basis: unset;
            padding: 0;
            height: 100%;
            cursor: pointer;

            &.ongoing {
              background: #23d160;
            }
          }
        `}</style>
      </div>
    )
  }

  scaleBlocks () {
    const hours = range(0, 24, 2)

    return (
      <div className='columns is-mobile scale'>
        {hours.map(this.scaleBlock)}
        <style jsx>{`
          .scale {
            font-size: 0.9rem;
            margin-top: -0.25rem;
          }
        `}</style>
      </div>
    )
  }

  scaleBlock = (i) => {
    if (i < 6 || i > 19) return null

    return (
      <div key={i} className='column'>
        {i}h
        <style jsx>{`
          .column {
            padding: 0 0 0 0.25rem;
            border-left: black solid 1px;
            box-sizing: border-box;

            :last-child {
              border-right: black solid 1px;
            }
          }
        `}</style>
      </div>
    )
  }

  add = (e) => {
    if (isFunction(this.props.add)) {
      this.props.add()
    }
  }

  edit = (entry, e) => {
    e.stopPropagation()

    if (isFunction(this.props.edit)) {
      this.props.edit(entry)
    }
  }
}

export default TimeStrip
