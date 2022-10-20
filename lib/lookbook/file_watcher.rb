module Lookbook
  class FileWatcher
    attr_reader :listeners, :force_polling

    def initialize(force_polling: false)
      @force_polling = force_polling
      @listeners = []
    end

    def watch(paths, extensions = ".*", opts = nil, &block)
      paths = PathUtils.normalize_all(paths)

      if paths.any?
        opts = opts.to_h
        opts[:only] = /\.(#{Array(extensions).join("|")})$/

        listeners << init_listener(paths, opts, &block)
      end
    end

    def start
      if listeners.any?
        Lookbook.logger.debug "Starting listeners"
        listeners.each { _1.start }
      end
    end

    def stop
      if listeners.any?
        Lookbook.logger.debug "Stopping listeners"
        listeners.each { _1.stop }
      end
    end

    protected

    def init_listener(paths, opts, &block)
      Listen.to(
        *paths,
        **opts,
        force_polling: force_polling
      ) do |modified, added, removed|
        block.call({modified: modified, added: added, removed: removed})
      end
    end
  end
end
