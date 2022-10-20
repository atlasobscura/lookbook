module Lookbook
  class Websocket
    attr_reader :engine_mount_path, :server, :logger

    def initialize(engine_mount_path, logger: Lookbook.logger)
      @engine_mount_path = engine_mount_path
      @logger = logger

      logger.info "Initializing websocket"

      if Gem::Version.new(Rails.version) >= Gem::Version.new(6.0)
        @server = ActionCable::Server::Base.new config: cable_config
      else
        @server = ActionCable::Server::Base.new
        @server.config = cable_config
      end
    end

    def broadcast(message, payload = nil)
      logger.debug message.to_s
      server.broadcast(message.to_s, payload.to_h)
    end

    def mount_path
      "/cable"
    end

    def full_mount_path
      "#{engine_mount_path}/#{mount_path}".gsub("//", "/")
    end

    def mountable?
      true
    end

    alias_method :mounted?, :mountable?

    def self.noop
      NullWebsocket.new
    end

    protected

    def cable_config
      cable = ActionCable::Server::Configuration.new
      cable.cable = {adapter: "async"}.with_indifferent_access
      cable.mount_path = nil
      cable.connection_class = -> { Lookbook::Connection }
      cable.logger = logger
      cable
    end
  end

  class NullWebsocket < NullObject
    def mountable?
      false
    end
    alias_method :mounted?, :mountable?
  end
end
