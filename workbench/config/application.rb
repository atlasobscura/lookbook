require_relative "boot"

require "rails"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Workbench
  class Application < Rails::Application
    config.load_defaults 7.0

    config.view_component.preview_paths << Rails.root.join("app/previews").to_s
    config.view_component.view_component_path = Rails.root.join("../app/components").to_s
    config.view_component.preview_controller = "PreviewController"
  end
end
