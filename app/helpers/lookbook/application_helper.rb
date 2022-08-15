module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def feature_enabled?(name)
      Lookbook::Features.enabled?(name)
    end

    def landing_path
      landing = feature_enabled?(:pages) ? Lookbook.pages.find(&:landing) || Lookbook.pages.first : nil
      if landing.present?
        lookbook_page_path landing.lookup_path
      else
        lookbook_home_path
      end
    end
  end
end
