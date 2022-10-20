module Shared
  class Base < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag, :class_names, :safe_join, :raw
    include Bridgetown::ViewComponentHelpers

    def initialize(**attrs)
      @attrs = attrs
    end

    def attrs
      @attrs ||= {}
    end

    def html_attrs
      html_attrs = attrs[:html] || {}
      html_attrs[:data] ||= {}
      html_attrs[:data].merge!(attrs[:data] || {})
      html_attrs[:data][:component] = component_name
      html_attrs[:class] ||= class_names(attrs[:class], html_attrs[:class])
      html_attrs
    end

    def component_name
      @component_name ||= self.class.name.delete_prefix("Shared::").underscore.tr("/", "-").tr("_", "-")
    end
  end
end
