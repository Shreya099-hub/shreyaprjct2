import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const properties = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'properties.json'), 'utf8')
)

export default function handler(req, res) {
  const { city, property_type, min_price, max_price } = req.query || {}
  const minPrice = min_price === undefined || min_price === '' ? null : Number(min_price)
  const maxPrice = max_price === undefined || max_price === '' ? null : Number(max_price)

  const results = properties.filter((property) => {
    if (city && property.city !== city) return false
    if (property_type && property.property_type !== property_type) return false
    if (minPrice !== null && !Number.isNaN(minPrice) && property.price < minPrice) return false
    if (maxPrice !== null && !Number.isNaN(maxPrice) && property.price > maxPrice) return false
    return true
  })

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json(results)
}
