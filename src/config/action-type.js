const ActionType = {
    //
    // Basic
    //
    ResetStoreData: 'resetStoreData',
    //
    Write: 'Write',
    Append: 'Append',
    // Add: 'Add',
    // Update: 'Update',
    // Query: 'Query',
    // Delete: 'Delete',
    //
    // Load
    //
    LoadConstructionSection: 'load_construction',
    //
    LoadAlignment: 'load_alignment',
    LoadBlignment: 'load_blignment',
    LoadClignment: 'load_clignment',
    LoadSideBlinddrain: 'load_sideblinddrain',
    LoadCrossBlinddrain: 'load_crossblinddrain',
    LoadChain: 'load_chain',
    LoadGuardwall: 'load_guardwall',
    LoadInterchange: 'load_interchange',
    LoadParkinglot: 'load_parkinglot',
    LoadServicearea: 'load_servicearea',
    LoadSoftbase: 'load_softbase',
    //
    LoadBridge: 'load_bridge',
    LoadCulvert: 'load_culvert',
    LoadGeology: 'load_geology',
    LoadOverbridge: 'load_overbridge',
    LoadTunnel: 'load_tunnel',
    //
    // Add
    //
    AddConstructionSection: 'add_construction',
    //
    AddAlignment: 'add_alignment',
    AddBlignment: 'add_blignment',
    AddClignment: 'add_clignment',
    AddSideBlinddrain: 'add_sideblinddrain',
    AddCrossBlinddrain: 'add_crossblinddrain',
    AddChain: 'add_chain',
    AddGuardwall: 'add_guardwall',
    AddInterchange: 'add_interchange',
    AddParkinglot: 'add_parkinglot',
    AddServicearea: 'add_servicearea',
    AddSoftbase: 'add_softbase',
    //
    AddBridge: 'add_bridge',
    AddCulvert: 'add_culvert',
    AddGeology: 'add_geology',
    AddOverbridge: 'add_overbridge',
    AddTunnel: 'add_tunnel',
    //
    // Update
    //
    UpdateConstructionSection: 'update_construction',
    //
    UpdateAlignment: 'update_alignment',
    UpdateBlignment: 'update_blignment',
    UpdateClignment: 'update_clignment',
    UpdateSideBlinddrain: 'update_sideblinddrain',
    UpdateCrossBlinddrain: 'update_crossblinddrain',
    UpdateChain: 'update_chain',
    UpdateGuardwall: 'update_guardwall',
    UpdateInterchange: 'update_interchange',
    UpdateParkinglot: 'update_parkinglot',
    UpdateServicearea: 'update_servicearea',
    UpdateSoftbase: 'update_softbase',
    //
    UpdateBridge: 'update_bridge',
    UpdateCulvert: 'update_culvert',
    UpdateGeology: 'update_geology',
    UpdateOverbridge: 'update_overbridge',
    UpdateTunnel: 'update_tunnel',
    //
    // interval tree
    //
    BuildChainIntervalTree: 'build_chain_interval_tree',
    BuildAlignmentIntervalTree: 'build_alignment_interval_tree',
    // others
    GlobalMessage: 'global_message',
};

export default ActionType;
