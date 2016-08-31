import React from 'react'
import * as Block from '../Block'

export default {
  title: 'Block',
  icon: 'Block',

  variations: [{
    title: 'Installments',
    Regular: (
      <Block.Installments.Main>
        <Block.Installments.Title>Your Installments</Block.Installments.Title>
        <Block.Installments.Content>
          <Block.Installments.Value
            title='Estimated total'
            value='€100'
          />
          <Block.Installments.Value
            clarification='†'
            title='APR'
            value='9.99%'
          />
        </Block.Installments.Content>
      </Block.Installments.Main>
    )
  }]
}