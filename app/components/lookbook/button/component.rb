module Lookbook
  class Button::Component < Lookbook::BaseComponent
    renders_one :icon, Lookbook::Icon::Component
    renders_one :dropdown

    ICON_SIZES = {
      xs: 3,
      sm: 3.5,
      md: 4,
      lg: 6
    }

    def initialize(icon: nil, tooltip: nil, disabled: false, size: :md, href: nil, **html_attrs)
      @icon = icon
      @tooltip = tooltip
      @disabled = disabled
      @size = size
      @href = href
      super(**html_attrs)
    end

    def icon_size
      ICON_SIZES[@size]
    end

    def padding
      [:xs, :sm].include?(@size) ? "p-1" : "p-2"
    end

    def tag_name
      @href.present? ? :a : :button
    end

    def dropdown?
      dropdown.present?
    end

    protected

    def alpine_component
      "buttonComponent"
    end
  end
end
