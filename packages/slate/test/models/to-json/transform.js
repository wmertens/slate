/** @jsx h */

import h from '../../helpers/h'

export const options = {
  color: 'red',
  transform: (json, opts) => {
    if (!opts) throw new Error('opts undef', json)
    return { kind: json.object, keys: Object.keys(json), color: opts.color }
  },
}

export const input = (
  <value>
    <document>
      <paragraph>
        o<b>n</b>e
      </paragraph>
    </document>
  </value>
)

export const output = {
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        isVoid: false,
        data: {},
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                object: 'leaf',
                text: 'o',
                marks: [],
              },
              {
                object: 'leaf',
                text: 'n',
                marks: [
                  {
                    object: 'mark',
                    type: 'bold',
                    data: {},
                  },
                ],
              },
              {
                object: 'leaf',
                text: 'e',
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
}
