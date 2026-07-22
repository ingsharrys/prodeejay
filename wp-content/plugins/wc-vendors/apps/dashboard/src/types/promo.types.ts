export interface PromotionPlugin {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  type: 'free' | 'premium'
  isInstalled: boolean 
  isActive: boolean
  basename: string
}

export interface PluginStatus {
  installed: boolean
  active: boolean
}
