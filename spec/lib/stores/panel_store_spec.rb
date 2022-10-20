require "rails_helper"

RSpec.describe Lookbook::PanelStore do
  context "instance" do
    let(:opts) { {partial: "path/to/partial"} }
    let(:panel_defaults) { Lookbook::PanelStore::DEFAULTS }
    let(:config) { Lookbook::PanelStore.new }

    before do
      config = Lookbook::PanelStore.new # standard:disable Lint/UselessAssignment
    end

    context ".add_panel" do
      context "with no partial path" do
        it "raises an exception" do
          expect { config.add_panel(:panel_name, :panel_group) }.to raise_error Lookbook::ConfigError
          expect { config.add_panel(:panel_name, :panel_group, {foo: "bar"}) }.to raise_error Lookbook::ConfigError
        end
      end

      context "with partial path as an option" do
        it "adds a panel to a group" do
          config.add_panel(:panel_name, :panel_group, opts)
          example = config.get_panel(:panel_name)

          expect(example).to_not be nil
          expect(example.name).to eql :panel_name
          expect(config.get_panel(:panel_name, :panel_group)).to_not be nil
        end
      end

      context "with partial path as arg" do
        it "adds a panel to a group" do
          config.add_panel(:panel_name, :panel_group, "path/to/partial")
          example = config.get_panel(:panel_name)

          expect(example).to_not be nil
          expect(example.name).to eql :panel_name
          expect(config.get_panel(:panel_name, :panel_group)).to_not be nil
        end
      end

      context "with options" do
        it "merges in the default options" do
          config.add_panel(:panel_name, :panel_group, opts)
          example = config.get_panel(:panel_name)

          panel_defaults.keys.each do |key|
            expect(example).to have_key key
          end
        end

        it "doesn't overwrite existing options" do
          config.add_panel(:panel_name, :panel_group, {
            partial: "path/to/partial",
            hotkey: "x"
          })
          example = config.get_panel(:panel_name)

          expect(example.partial).to eq "path/to/partial"
          expect(example.hotkey).to eq "x"
        end
      end

      context "no position specified" do
        it "adds each panel in order" do
          (1..3).each do |i|
            config.add_panel("panel_#{i}", :panel_group, opts)
          end

          example_panels = config.in_group(:panel_group)

          (1..3).each do |i|
            expect(example_panels[i - 1].name).to eql "panel_#{i}".to_sym
          end
          expect(config.count_panels).to eq 3
        end
      end

      context "with position specified" do
        it "inserts the panel in the correct position" do
          (1..3).each do |i|
            config.add_panel("panel_#{i}", :panel_group, opts)
          end

          config.add_panel(:panel_4, :panel_group, {
            partial: "path/to/partial",
            position: 2
          })

          expect(config.in_group(:panel_group)[1].name).to eql :panel_4
          expect(config.count_panels).to eq 4
        end

        it "inserts the panel at the start if the position value is zero" do
          (1..3).each do |i|
            config.add_panel("panel_#{i}", :panel_group, opts)
          end

          config.add_panel(:panel_4, :panel_group, {
            partial: "path/to/partial",
            position: 0
          })

          expect(config.in_group(:panel_group).first.name).to eql :panel_4
          expect(config.count_panels).to eq 4
        end

        it "inserts the panel at the end if the position value is greater than the number of Panel" do
          (1..3).each do |i|
            config.add_panel("panel_#{i}", :panel_group, opts)
          end

          config.add_panel(:panel_4, :panel_group, {
            partial: "path/to/partial",
            position: 100
          })

          expect(config.in_group(:panel_group).last.name).to eql :panel_4
          expect(config.count_panels).to eq 4
        end
      end
    end

    context ".update_panel" do
      before do
        (1..3).each do |i|
          config.add_panel("panel_#{i}", :panel_group, {
            partial: "path/to/partial",
            id: "a-custom-id"
          })
        end
      end

      context "panel does not exist" do
        it "raises an exception" do
          expect { config.update_panel("panel_oops", {id: "oops"}) }.to raise_error Lookbook::ConfigError
        end
      end

      context "existing panel" do
        it "merges existing options with new ones" do
          new_opts = {
            id: "a-new-id",
            label: "A new label"
          }
          config.update_panel(:panel_1, new_opts)

          expect(config.get_panel(:panel_1)).to have_attributes(**new_opts, partial: "path/to/partial")
        end

        it "does not override the :name" do
          config.update_panel(:panel_1, {
            name: "foo"
          })

          expect(config.get_panel(:panel_1).name).to eq :panel_1
        end

        context "position specified" do
          it "moves the panel to the correct position" do
            config.update_panel(:panel_1, {
              position: 2
            })

            expect(config.in_group(:panel_group)[1].name).to eq :panel_1
          end
        end
      end
    end

    context ".remove_panel" do
      before do
        (1..3).each do |i|
          config.add_panel("panel_#{i}", :panel_group, opts)
        end
      end

      context "panel does not exist" do
        it "raises an exception" do
          expect { config.remove_panel("panel_oops") }.to raise_error Lookbook::ConfigError
        end
      end

      context "existing panel" do
        it "removes it from the set of panels" do
          config.remove_panel(:panel_1)
          expect(config.get_panel(:panel_1)).to be nil

          (2..3).each do |i|
            expect { config.get_panel("panel_#{i}") }.not_to raise_error
          end
        end
      end
    end

    context ".load_config" do
      let(:config_data) { Lookbook::PanelStore.default_config }

      it "loads the config" do
        config.load_config(config_data)

        config_data.each do |group_name, group_panels|
          group_panels.each do |panel|
            expect(config.get_panel(panel[:name])).not_to be nil
          end
        end
      end
    end
  end

  context "class" do
    let(:config_store) { Lookbook::PanelStore }

    context ".resolve_config" do
      let(:data) { {hotkey_letter: "x"} }
      let(:config) do
        {name: "example", label: "a label", hotkey: lambda { |data| "ctrl.#{data.hotkey_letter}" }}
      end

      it "resolves any procs in the config with the provided data" do
        resolved = config_store.resolve_config(config, data)

        expect(resolved).to have_attributes({
          label: "a label",
          hotkey: "ctrl.x"
        })
      end
    end

    context ".init_from_config" do
      it "initializes a new instance from the default config options" do
        config = config_store.init_from_config
        Lookbook::PanelStore.default_config.each do |group_name, panels|
          panels.each do |opts|
            expect(config.get_panel(opts[:name])).not_to be nil
          end
        end
      end
    end
  end
end
