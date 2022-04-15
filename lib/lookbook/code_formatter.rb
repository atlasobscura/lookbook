require "rouge"
require "htmlbeautifier"

module Lookbook
  module CodeFormatter
    class << self
      def highlight(source, language, opts = {})
        source&.strip! unless opts[:strip] == false
        source&.gsub!("&gt;", ">")&.gsub!("&lt;", "<")
        source.gsub!("&amp;", "&")
        language ||= "ruby"
        formatter = Formatter.new(opts)
        lexer = Rouge::Lexer.find(language.to_s) || Rouge::Lexer.find("plaintext")
        formatter.format(lexer.lex(source)).html_safe
      end

      def beautify(source, language = "html") 
        return source unless language.downcase == "html"

        fragment = Nokogiri::HTML.fragment(source)
        html = collapse_class_lists(fragment).to_html.gsub(/\>[ ]+\</, ">\n<")
        HtmlBeautifier.beautify(html).strip.html_safe
      end

      private

      def collapse_class_lists(fragment)
        fragment.search("[class]").each do |el|
          el["class"] = el["class"].strip.squeeze(" ").gsub("\n", "")
        end
        fragment
      end
    end
  end

  class Formatter < Rouge::Formatters::HTML
    def initialize(opts = {})
      @opts = opts
      @highlight_lines = opts[:highlight_lines].to_a || []
      @start_line = opts[:start_line] || 0
    end

    def stream(tokens, &block)
      token_lines(tokens).each_with_index do |line_tokens, i|
        yield "<div class='line #{"highlighted-line" if @highlight_lines.include?(i + 1)}'>"
        yield "<span class='line-number'>#{@start_line + i}</span>" if @opts[:line_numbers]
        yield "<span class='line-content'>"
        line_tokens.each do |token, value|
          yield span(token, value)
        end
        yield "</span>"
        yield "</div>"
      end
    end
  end
end
